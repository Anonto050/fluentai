'use client';

import { FC, useState, useEffect } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { getRandomWords } from './randomWords'; 
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./header";
import { Button } from "@/components/ui/button";
import { Footer } from "./footer";
import { WordPrompt } from "./WordPrompt";
import { apiFetch } from '@/lib/apiService';
import { useAuth } from "@clerk/nextjs";

interface Question {
  id: number;
  word: string;
}

const Page: FC = () => {
  const { userId } = useAuth();
  const [color, setColor] = useState<string>('#000');
  const [lineWidth, setLineWidth] = useState<number>(5); 
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [ocrText, setOcrText] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const [language, setLanguage] = useState<string>("");
  const [userProgressData, setUserProgressData] = useState<any>(null);
  const [activeCourse, setActiveCourse] = useState<any>(null);
  const [isPro, setIsPro] = useState(true); // Set it initially as true for now

  const languageCodeMap: { [key: string]: string } = {
    english: "en",
    spanish: "es",
    french: "fr",
    german: "de",
    italian: "it",
    japanese: "ja",
    korean: "ko",
    portuguese: "pt",
  };

  // Fetch user progress and course info using useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        // Fetch user progress
        const progress = await apiFetch(`/user-progress/user/${userId}`);
        setUserProgressData(progress);

        if (progress && progress[0]?.activeCourseId) {
          // Fetch active course based on activeCourseId
          const course = await apiFetch(`/courses/${progress[0].activeCourseId}`);
          setActiveCourse(course);

          // Set language based on the course title
          const courseLanguage = course?.title?.toLowerCase() || "spanish";
          setLanguage(courseLanguage);
      

          // Fetch random words based on the language
          const fetchedQuestions = getRandomWords(courseLanguage as "spanish" | "french" | "german" | "italian" | "japanese" | "portuguese");
          setQuestions(fetchedQuestions);
        } else {
          console.error('No active course found.');
        }
      } catch (error) {
        console.error('Failed to fetch user progress or course data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Extract text from canvas and compare with the current question
  const extractTextFromCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        const formData = new FormData();
        formData.append('file', blob, 'image.png');

        const languageCode = languageCodeMap[language.toLowerCase()] || "unk"; 

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AZURE_ENDPOINT}/vision/v3.2/read/analyze?language=${languageCode}`, 
          formData, 
          {
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_AZURE_API_KEY,
              'Content-Type': 'application/octet-stream',
            },
          }
        );

        const operationLocation = response.headers['operation-location'];
        if (operationLocation) {
          const operationId = operationLocation.split('/').pop();

          // Polling to get the result
          let result;
          do {
            result = await axios.get(
              `${process.env.NEXT_PUBLIC_AZURE_ENDPOINT}/vision/v3.2/read/analyzeResults/${operationId}`,
              {
                headers: {
                  'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_AZURE_API_KEY,
                },
              }
            );
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for a second before polling again
          } while (result.data.status === 'running' || result.data.status === 'notStarted');

          if (result.data.status === 'succeeded') {
            const extractedText = result.data.analyzeResult.readResults
              .map((readResult: any) =>
                readResult.lines.map((line: any) =>
                  line.words.map((word: any) => word.text).join(' ')
                ).join('\n')
              ).join('\n');
            setOcrText(extractedText);
            checkAnswer(extractedText); // Compare the extracted text with the current question
          } else {
            setOcrText("Failed to extract text.");
          }
        }
      } catch (error) {
        console.error('Error extracting text:', error);
        setOcrText("Failed to extract text.");
      }
    }, 'image/png');
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Compare the extracted text with the current question
  const checkAnswer = (extractedText: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = extractedText.trim().toLowerCase() === currentQuestion.word.trim().toLowerCase();

    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  const handleCheck = () => {
    if (status === "correct") {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      clear(); // Clear the canvas for the next question
      setOcrText(''); // Clear the extracted text
      setStatus("none"); // Reset the status
    } else if (status === "wrong") {
      clear(); // Clear the canvas for retry
      setOcrText(''); // Clear the extracted text
      setStatus("none"); // Change button back to "Check"
    } else {
      extractTextFromCanvas(); 
    }
  };

  // Drawing function for the canvas
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    
    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row-reverse gap-[48px] px-4 flex-grow">
        <StickyWrapper>
        {activeCourse && (
          <UserProgress
            activeCourse={activeCourse}
            hearts={userProgressData[0]?.hearts || 0}
            points={userProgressData[0]?.points || 0}
            hasActiveSubscription={isPro}
          />
        )}

          <WordPrompt 
            word={questions[currentQuestionIndex]?.word || "Loading..."} 
            extractedText={ocrText || "No text extracted yet."}
          />
     
        </StickyWrapper>

        <FeedWrapper>
          <Header title={capitalizeFirstLetter(language)} />
          
          <div className='w-full h-full bg-white flex justify-center items-center p-4' style={{ marginTop: '-60px' }}>
              <div className='flex flex-col gap-10 pr-10'>
                  <ChromePicker 
                    color={color} 
                    onChange={(e) => setColor(e.hex)} 
                    className="shadow-lg rounded-lg" 
                  />

                  <div className="space-y-4 rounded-xl border-2 p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-2">
                        <h3 className="text-lg font-bold">Line Width</h3>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(Number(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-muted-foreground">Selected Width: {lineWidth}px</p>
                    </div>
                  </div>

                  <Button 
                    variant="super" 
                    className="w-full" 
                    size="lg" 
                    onClick={clear}
                  >
                    Clear canvas
                  </Button>
              </div>
              
              <canvas
                  ref={canvasRef}
                  onMouseDown={onMouseDown}
                  width={650}
                  height={650}
                  className='border border-black rounded-md shadow-lg'
              />
          </div>

          <div className="w-full mt-auto" style={{ marginTop: '-40px' }}>
            <Footer
              disabled={false} 
              status={status}
              onCheck={handleCheck}
            />
          </div>
        </FeedWrapper>
      </div>
    </div>
  );
};

export default Page;

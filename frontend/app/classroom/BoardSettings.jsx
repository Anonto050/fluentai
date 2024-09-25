import { teachers, useAITeacher } from "@/hooks/useAITeacher";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const BoardSettings = () => {

  const furigana = useAITeacher((state) => state.furigana);
  const setFurigana = useAITeacher((state) => state.setFurigana);

  const english = useAITeacher((state) => state.english);
  const setEnglish = useAITeacher((state) => state.setEnglish);

  const teacher = useAITeacher((state) => state.teacher);
  const setTeacher = useAITeacher((state) => state.setTeacher);

  const classroom = useAITeacher((state) => state.classroom);
  const setClassroom = useAITeacher((state) => state.setClassroom);

  return (
    <>

      <div className="fixed bottom-0 right-0 z-20">
        <Button
            variant="default"
            className="py-4 px-8 text-base rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"         
          >
            <Link href="/learn">
              Back
            </Link>
          </Button>
      </div>
      
      <div className="fixed top-0 right-0 flex flex-row gap-4">
        {teachers.map((sensei, idx) => (
          <div
            key={idx}
            className={`p-2 bg-white rounded-lg shadow-lg transition-transform transform duration-500 ${
              teacher === sensei ? "scale-105" : "scale-100"
            }`}
            onClick={() => setTeacher(sensei)}
          >
            <div className="border-4 border-white rounded-lg">
              <img
                src={`/images/${sensei}.jpg`}
                alt={sensei}
                className="object-cover w-20 h-20 rounded-lg"
              />
            </div>
            <h2 className="text-lg font-bold mt-2 text-center text-black">
              {sensei}
            </h2>
          </div>
        ))}
      </div>

      {/* Parent Div for Grouped Buttons */}
      <div className="fixed bottom-10 left-10 flex gap-10">
        {/* Classroom Toggle Buttons */}
        <div className="flex flex-col gap-10">
          <Button
            variant="default"
            className="py-4 px-8 text-base rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setClassroom("default")}
          >
            Default Classroom
          </Button>
          <Button
            variant="default"
            className="py-4 px-8 text-base rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setClassroom("alternative")}
          >
            Alternative Classroom
          </Button>
        </div>

        {/* Speech Style Buttons */}
        {/* <div className="flex flex-col gap-4">
          <Button
            variant="default"
            className="py-4 px-8 text-xl rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setSpeech("formal")}
          >
            Formal
          </Button>
          <Button
            variant="default"
            className="py-4 px-8 text-xl rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setSpeech("casual")}
          >
            Casual
          </Button>
        </div> */}

        {/* Furigana and English Toggle Buttons */}
        {/* <div className="flex flex-col gap-4">
          <Button
            variant="default"
            className="py-4 px-8 text-xl rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setFurigana(!furigana)}
          >
            Furigana
          </Button>
          <Button
            variant="default"
            className="py-4 px-8 text-xl rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => setEnglish(!english)}
          >
            English
          </Button>
        </div> */}
      </div>
    </>
  );
};

export type courses = {
    id: number;
    title: string;
    imageSrc: string;
  };
  
  export type units = {
    id: number;
    title: string;
    description: string;
    courseId: number;
    order: number;
  };
  
  export type lessons = {
    id: number;
    title: string;
    unitId: number;
    order: number;
  };
  
  export type challenges = {
    id: number;
    lessonId: number;
    type: 'SELECT' | 'ASSIST';
    question: string;
    order: number;
  };
  
  export type challengeOptions = {
    id: number;
    challengeId: number;
    text: string;
    correct: boolean;
    imageSrc: string | null;
    audioSrc: string | null;
  };  
  
  export type challengeProgress = {
    id: number;
    userId: string;
    challengeId: number;
    completed: boolean;
  };
  
  export type userProgress = {
    userId: string;
    userName: string;
    userImageSrc: string;
    activeCourseId?: number;
    hearts: number;
    points: number;
  };
  
  export type userSubscription = {
    id: number;
    userId: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    stripeCurrentPeriodEnd: Date;
  };
  
  // Define relations
  export type coursesRelations = {
    userProgress: userProgress[];
    units: units[];
  };
  
  export type unitsRelations = {
    course: courses;
    lessons: lessons[];
  };
  
  export type lessonsRelations = {
    unit: units;
    challenges: challenges[];
  };
  
  export type challengesRelations = {
    lesson: lessons;
    challengeOptions: challengeOptions[];
    challengeProgress: challengeProgress[];
  };
  
  export type challengeOptionsRelations = {
    challenge: challenges;
  };
  
  export type challengeProgressRelations = {
    challenge: challenges;
  };
  
  export type userProgressRelations = {
    activeCourse: courses;
  };
  

  
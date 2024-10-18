import SCORM from 'scorm-again';

let scorm: SCORM;

export const initSCORM = () => {
  scorm = new SCORM();
  const initResult = scorm.initialize();
  
  if (initResult) {
    console.log('SCORM initialized successfully');
  } else {
    console.error('SCORM initialization failed');
  }
};

export const setLessonStatus = (status: string) => {
  scorm.set('cmi.core.lesson_status', status);
};

export const setScore = (score: number) => {
  scorm.set('cmi.core.score.raw', score.toString());
};

export const saveSCORMData = () => {
  const saveResult = scorm.save();
  
  if (saveResult) {
    console.log('SCORM data saved successfully');
  } else {console.error('Failed to save SCORM data');
  }
};

export const terminateSCORM = () => {
  const terminateResult = scorm.terminate();
  
  if (terminateResult) {
    console.log('SCORM session terminated successfully');
  } else {
    console.error('Failed to terminate SCORM session');
  }
};
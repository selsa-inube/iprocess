interface FilterProgressForDate {
    executionDate: string;
    month: string;
    year: string;
  }
  
  interface ValidateProgresses {
    id: string;
    processDescription: string;
    executionDate: Date;
    generalError: string;
    aplication?: string;
    periodicity?: string;
    state?: string;
    requirements?: string;
  }
  
  export type { FilterProgressForDate, ValidateProgresses };
  
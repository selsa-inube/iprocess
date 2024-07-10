interface FilterProgressForDate {
    executionDate: string;
    month: string;
    year: string;
  }
  
  interface ValidateProgresses {
    id: string;
    businessUnit: string;
    executionDate: Date;
    requeriments?: string;
  }
  
  export type { FilterProgressForDate, ValidateProgresses };
  
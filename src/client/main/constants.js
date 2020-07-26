export const BASE_PATH = "http://localhost:8080/api";

export function roughScale(x) {
    const parsed = parseInt(x, 16);
    if (isNaN(parsed)) {
         return 0; 
    }
    return parsed * 100;
  }
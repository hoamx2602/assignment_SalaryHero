export const generateJobKey = (userId: string, companyId: string): string => {
  return `task_handle_${companyId}_${userId}`;
};

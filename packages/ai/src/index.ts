export type AIExecutionStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface AIRequest {
  requestId: string;
  businessId: string;
  userId: string;
  task: string;
}

export interface AIResult {
  requestId: string;
  status: AIExecutionStatus;
  output: unknown;
}

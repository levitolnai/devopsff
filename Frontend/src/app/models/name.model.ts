export interface Name {
  id: number;
  fullName: string;
  createdAt: Date;
}

export interface AddNameRequest {
  fullName: string;
}

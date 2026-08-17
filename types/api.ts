// --- Auth DTOs ---
export interface LoginRequest {
  email?: string;
  username?: string;
  password?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;

}

export interface AuthResponse {
  authenticationToken: string;
  username: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

// --- Post DTOs ---
export interface CreatePostRequest {
  postName: string;
  url?: string;
  description?: string;
  subredditName: string;
}

export interface PostResponse {
  id: number;
  postName: string;
  url?: string;
  description?: string;
  userName: string;
  subredditName: string;
  voteCount: number;
  commentCount: number;
  duration?: string;
  upVote?: boolean;
  downVote?: boolean;
}

// --- Comment DTOs ---
export interface CreateCommentRequest {
  text: string;
  postId: number;
  duration?: string;
}

export interface CommentResponse {
  id: number;
  text: string;
  postId: number;
  createdDate?: string;
  userName: string;
}

// --- Subreddit DTOs ---
export interface SubredditRequest {
  name: string;
  description: string;
}

export interface SubredditResponse {
  id: number;
  name: string;
  description: string;
  numberOfPosts?: number;
}

export interface SubredditMemberResponse {
  id: number;
  username: string;
  role: string;
}

export interface ChangeRoleRequest {
  role: string;
}

// --- Vote DTOs ---
export type VoteType = 'UPVOTE' | 'DOWNVOTE';

export interface VoteRequest {
  voteType: VoteType;
}

export interface VoteResponse {
  id: number;
  voteType: VoteType;
}

// --- Search & Trending ---
export interface SearchResponse {
  posts?: PostResponse[];
  subreddits?: SubredditResponse[];
  users?: string[];
}

export interface TrendingResponse {
  keyword: string;
  searchCount: number;
}
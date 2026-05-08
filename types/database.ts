export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; full_name: string | null; avatar_url: string | null; created_at: string };
        Insert: { id: string; full_name?: string | null; avatar_url?: string | null; created_at?: string };
        Update: { full_name?: string | null; avatar_url?: string | null };
        Relationships: [];
      };
      trips: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          destination: string;
          trip_type: string;
          start_date: string;
          end_date: string;
          target_budget: number;
          currency: string;
          description: string | null;
          invite_code: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["trips"]["Row"]> & {
          owner_id: string;
          name: string;
          destination: string;
          trip_type: string;
          start_date: string;
          end_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["trips"]["Row"]>;
        Relationships: [];
      };
      trip_members: {
        Row: { id: string; trip_id: string; user_id: string; role: string; joined_at: string };
        Insert: { id?: string; trip_id: string; user_id: string; role?: string; joined_at?: string };
        Update: { role?: string };
        Relationships: [];
      };
      itinerary_items: {
        Row: {
          id: string;
          trip_id: string;
          title: string;
          item_date: string;
          start_time: string | null;
          end_time: string | null;
          location: string | null;
          estimated_cost: number;
          notes: string | null;
          status: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["itinerary_items"]["Row"]> & {
          trip_id: string;
          title: string;
          item_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["itinerary_items"]["Row"]>;
        Relationships: [];
      };
      budget_items: {
        Row: {
          id: string;
          trip_id: string;
          name: string;
          category: string;
          estimated_amount: number;
          notes: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["budget_items"]["Row"]> & {
          trip_id: string;
          name: string;
          category: string;
          estimated_amount: number;
        };
        Update: Partial<Database["public"]["Tables"]["budget_items"]["Row"]>;
        Relationships: [];
      };
      expenses: {
        Row: {
          id: string;
          trip_id: string;
          name: string;
          category: string;
          amount: number;
          paid_by: string;
          expense_date: string;
          notes: string | null;
          split_method: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["expenses"]["Row"]> & {
          trip_id: string;
          name: string;
          category: string;
          amount: number;
          paid_by: string;
          expense_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["expenses"]["Row"]>;
        Relationships: [];
      };
      expense_splits: {
        Row: {
          id: string;
          expense_id: string;
          user_id: string;
          share_amount: number;
          is_settled: boolean;
        };
        Insert: {
          id?: string;
          expense_id: string;
          user_id: string;
          share_amount?: number;
          is_settled?: boolean;
        };
        Update: { share_amount?: number; is_settled?: boolean };
        Relationships: [];
      };
      trip_reviews: {
        Row: {
          id: string;
          trip_id: string;
          user_id: string;
          rating: number | null;
          worth_it: boolean | null;
          best_moment: string | null;
          biggest_challenge: string | null;
          tips: string | null;
          private_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["trip_reviews"]["Row"]> & {
          trip_id: string;
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["trip_reviews"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

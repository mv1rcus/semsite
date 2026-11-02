export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      contacted_leads: {
        Row: {
          city: string | null
          created_at: string
          id: string
          name: string
          phone: string | null
          place_id: string
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          name: string
          phone?: string | null
          place_id: string
          user_id?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          name?: string
          phone?: string | null
          place_id?: string
          user_id?: string
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id: string
          sender_id?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id?: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          body: string
          created_at: string
          id: string
          parent_id: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id: string
          user_id?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id?: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reposts: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id?: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reposts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          body: string
          created_at: string
          id: string
          media_path: string | null
          media_type: string | null
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          media_path?: string | null
          media_type?: string | null
          user_id?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          media_path?: string | null
          media_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profile_likes: {
        Row: {
          created_at: string
          liker_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          liker_id?: string
          profile_id: string
        }
        Update: {
          created_at?: string
          liker_id?: string
          profile_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          banner_url: string | null
          bio: string
          city: string
          display_name: string
          id: string
          link_url: string
          phone: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string
          banner_url?: string | null
          bio?: string
          city?: string
          display_name?: string
          id: string
          link_url?: string
          phone?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string
          banner_url?: string | null
          bio?: string
          city?: string
          display_name?: string
          id?: string
          link_url?: string
          phone?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      site_demonstrations: {
        Row: {
          address: string
          category: string
          created_at: string
          description: string
          headline: string
          id: string
          last_opened_at: string | null
          name: string
          phone: string
        }
        Insert: {
          address?: string
          category: string
          created_at?: string
          description: string
          headline: string
          id?: string
          last_opened_at?: string | null
          name: string
          phone?: string
        }
        Update: {
          address?: string
          category?: string
          created_at?: string
          description?: string
          headline?: string
          id?: string
          last_opened_at?: string | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
      verified_profiles: {
        Row: {
          created_at: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verified_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      dm_threads: {
        Args: never
        Returns: {
          avatar_url: string
          display_name: string
          last_at: string
          last_body: string
          last_from_me: boolean
          other_id: string
          unread: number
          username: string
          verified: boolean
        }[]
      }
      feed_posts: {
        Args: { only_user?: string }
        Returns: {
          avatar_url: string
          body: string
          created_at: string
          display_name: string
          i_liked: boolean
          i_reposted: boolean
          id: string
          likes: number
          media_path: string
          media_type: string
          reposted_by: string
          reposted_by_name: string
          reposts: number
          user_id: string
          username: string
          verified: boolean
        }[]
      }
      follow_list: {
        Args: { kind: string; uname: string }
        Returns: {
          avatar_url: string
          bio: string
          display_name: string
          username: string
          verified: boolean
        }[]
      }
      get_post: {
        Args: { pid: string }
        Returns: {
          avatar_url: string
          body: string
          created_at: string
          display_name: string
          i_liked: boolean
          i_reposted: boolean
          id: string
          likes: number
          media_path: string
          media_type: string
          reposts: number
          user_id: string
          username: string
          verified: boolean
        }[]
      }
      get_public_profile: {
        Args: { uname: string }
        Returns: {
          avatar_url: string
          banner_url: string
          bio: string
          city: string
          display_name: string
          followers: number
          following: number
          i_follow: boolean
          i_liked: boolean
          id: string
          likes: number
          link_url: string
          username: string
          verified: boolean
        }[]
      }
      my_notifications: {
        Args: never
        Returns: {
          avatar_url: string
          created_at: string
          display_name: string
          kind: string
          post_id: string
          snippet: string
          username: string
          verified: boolean
        }[]
      }
      post_comments_list: {
        Args: { pid: string }
        Returns: {
          avatar_url: string
          body: string
          created_at: string
          display_name: string
          id: string
          parent_id: string
          reply_to_username: string
          user_id: string
          username: string
          verified: boolean
        }[]
      }
      posts_by_tag: {
        Args: { p_tag: string }
        Returns: {
          avatar_url: string
          body: string
          created_at: string
          display_name: string
          i_liked: boolean
          i_reposted: boolean
          id: string
          likes: number
          media_path: string
          media_type: string
          reposts: number
          user_id: string
          username: string
          verified: boolean
        }[]
      }
      search_profiles: {
        Args: { q: string }
        Returns: {
          avatar_url: string
          bio: string
          city: string
          display_name: string
          username: string
          verified: boolean
        }[]
      }
      trending_tags: {
        Args: never
        Returns: {
          tag: string
          uses: number
        }[]
      }
      who_to_follow: {
        Args: never
        Returns: {
          avatar_url: string
          bio: string
          city: string
          display_name: string
          followers: number
          id: string
          username: string
          verified: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

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
      closed_sales: {
        Row: {
          amount_cents: number
          client_id: string
          client_name: string
          closed_at: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          amount_cents?: number
          client_id: string
          client_name: string
          closed_at?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Update: {
          amount_cents?: number
          client_id?: string
          client_name?: string
          closed_at?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
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
      osm_search_cache: {
        Row: {
          cache_key: string
          created_at: string
          payload: Json
        }
        Insert: {
          cache_key: string
          created_at?: string
          payload: Json
        }
        Update: {
          cache_key?: string
          created_at?: string
          payload?: Json
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
      search_usage: {
        Row: {
          count: number
          day: string
          user_id: string
        }
        Insert: {
          count?: number
          day: string
          user_id: string
        }
        Update: {
          count?: number
          day?: string
          user_id?: string
        }
        Relationships: []
      }
      site_demonstrations: {
        Row: {
          address: string
          category: string
          created_at: string
          description: string
          expires_at: string | null
          google_rating: number | null
          google_rating_count: number | null
          google_reviews: Json
          headline: string
          id: string
          last_opened_at: string | null
          last_opened_device: string | null
          name: string
          open_count: number
          owner_id: string | null
          phone: string
          place_id: string | null
          show_in_portfolio: boolean
          slug: string | null
        }
        Insert: {
          address?: string
          category: string
          created_at?: string
          description: string
          expires_at?: string | null
          google_rating?: number | null
          google_rating_count?: number | null
          google_reviews?: Json
          headline: string
          id?: string
          last_opened_at?: string | null
          last_opened_device?: string | null
          name: string
          open_count?: number
          owner_id?: string | null
          phone?: string
          place_id?: string | null
          show_in_portfolio?: boolean
          slug?: string | null
        }
        Update: {
          address?: string
          category?: string
          created_at?: string
          description?: string
          expires_at?: string | null
          google_rating?: number | null
          google_rating_count?: number | null
          google_reviews?: Json
          headline?: string
          id?: string
          last_opened_at?: string | null
          last_opened_device?: string | null
          name?: string
          open_count?: number
          owner_id?: string | null
          phone?: string
          place_id?: string | null
          show_in_portfolio?: boolean
          slug?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          id: string
          price_id: string
          product_id: string
          status: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          price_id: string
          product_id: string
          status?: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          price_id?: string
          product_id?: string
          status?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_store: {
        Row: {
          data: Json
          item_id: string
          kind: string
          position: number
          updated_at: string
          user_id: string
        }
        Insert: {
          data: Json
          item_id: string
          kind: string
          position?: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          data?: Json
          item_id?: string
          kind?: string
          position?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      verified_profiles: {
        Row: {
          created_at: string
          expires_at: string | null
          profile_id: string
          source: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          profile_id: string
          source?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          profile_id?: string
          source?: string
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
      admin_accounts: {
        Args: never
        Returns: {
          created_at: string
          display_name: string
          email: string
          last_sign_in_at: string
          username: string
        }[]
      }
      am_i_verified: { Args: never; Returns: boolean }
      consume_search: { Args: never; Returns: number }
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
      grant_paid_months: {
        Args: { p_months?: number; p_profile: string }
        Returns: undefined
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
      searches_left_today: { Args: never; Returns: number }
      sweep_verified_expiry: { Args: never; Returns: undefined }
      trending_tags: {
        Args: never
        Returns: {
          tag: string
          uses: number
        }[]
      }
      verified_status: { Args: never; Returns: Json }
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

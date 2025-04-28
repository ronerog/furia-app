
export interface User {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    birthDate?: Date;
    city?: string;
    state?: string;
    country?: string;
    favoriteGame?: string;
    howDidYouFind?: string;
    instagramHandle?: string;
    twitterHandle?: string;
    twitchHandle?: string;
    favoritePlayer?: string;
    points: number;
    createdAt: Date;
  }
  
  export interface ChatMessage {
    id: string;
    text: string;
    userId: string;
    username: string;
    timestamp: Date;
  }
  

  export interface Activity {
    id: string;
    user: string;
    type: 'chat_message' | 'watch_match' | 'watch_highlights' | 'view_time' | 'daily_login' | 'reward_redemption';
    points: number;
    rewardId?: string;
    rewardName?: string;
    timestamp: Date;
  }
  

  export interface Reward {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    pointsCost: number;
  }
  

  export interface Player {
    id: string;
    nickname: string;
    realName: string;
    role: string;
    photoUrl: string;
    twitterUrl?: string;
    twitchUrl?: string;
    instagramUrl?: string;
    game: string;
    description?: string;
  }
  

  export interface Match {
    id: string;
    tournamentName: string;
    tournamentLogo: string;
    date: Date;
    game: string;
    opponentName: string;
    opponentLogo: string;
    furiaScore?: number;
    opponentScore?: number;
    streamUrl?: string;
    highlightsUrl?: string;
    status: 'upcoming' | 'live' | 'completed';
  }
  

  export interface Stream {
    id: string;
    title: string;
    streamerName: string;
    streamerAvatar: string;
    thumbnailUrl: string;
    url: string;
    game: string;
    viewerCount: number;
    isLive: boolean;
    startedAt?: Date;
  }

  export interface News {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    imageUrl: string;
    date: Date;
    author: string;
    tags: string[];
  }
  

  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    game?: string;
    inStock: boolean;
  }

  export interface Game {
    id: string;
    name: string;
    slug: string;
    description: string;
    heroImage: string;
    players: Player[];
    upcomingMatches: Match[];
    previousMatches: Match[];
    products: Product[];
    liveStreams: Stream[];
    streamerContent: Stream[];
  }
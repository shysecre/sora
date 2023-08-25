export interface TwitchCategory {
  id: string
  name: string
  box_art_url: string
}

export interface GetCategoriesByQueryResponse {
  data: TwitchCategory[]
  pagination: string
}

export interface CreateLocalCategoryOptions {
  data: {
    twitchId: string
    twitchName: string
    twitchBoxImage: string
  }[]
}

export interface LocalCategoryItem {
  twitch_reward_id: string
  id: string
}

export interface CreateLocalCategoryResponse {
  twitch_id: string
  twitch_name: string
  twitch_box_image: string
  items: LocalCategoryItem[]
  id: string
}

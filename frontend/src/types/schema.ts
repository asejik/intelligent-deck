export type ProjectStatus = 'draft' | 'generating' | 'completed' | 'error';

export interface Project {
  id: string;
  created_at: string;
  title: string;
  source_text?: string;
  status: ProjectStatus;
  user_id?: string;
}

export interface SlideContent {
  title?: string;
  subtitle?: string;
  body_points?: string[];
}

export interface Slide {
  id: string;
  project_id: string;
  created_at: string;
  sort_order: number;
  layout_type: 'title_slide' | 'bullet_list' | 'image_left' | 'image_right';
  content: SlideContent;
  speaker_notes?: string;
  image_prompt?: string;
  image_url?: string;
}
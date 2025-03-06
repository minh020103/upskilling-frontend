import React from "react";

export interface ItemProgressionOverTimeProps {
  title?: string;
  numberBig?: number;
  numberSmall?: number;
  increase?: boolean;
  data?: number[];
}
export interface ChartAreaProps {
  data?: number[];
}
export interface ModalCalenderProps {
  defaultDate?: string;
  date?: string;
  setDate?: (value: React.SetStateAction<string>) => void;
}
export interface ContentCardTextProps {
  title: string;
  items: Itemtext[];
}
export interface Itemtext {
  title: string;
  description: string;
}
export interface ChallengeAndViewAllProps {
  title: string;
  description: string | null;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClickViewAll: () => void;
  render: React.ReactNode;
  className: string | null;
  loadMoreActive: "active" | "in-active";
}
export interface CompletedChallengeProps {
  imgItem: string;
  title: string;
  status: string;
  score: number;
  complatedDate: string;
  className: string | null;
  id: number;
}

export interface DataChartBySkill {
  skillName: string;
  data: number[];
  totalScoreBySkill: number;
}

export interface ContentAnalysisSkill {
  strengths: Itemtext[];
  areasNeedingImprovements: Itemtext[];
}

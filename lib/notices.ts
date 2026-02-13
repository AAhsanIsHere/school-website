export type Notice = {
  id: string;
  date: string;      // "YYYY-MM-DD"
  title: string;
  fileUrl?: string;  // optional PDF link
  category?: string;
};

export const notices: Notice[] = [
  { id: "1", date: "2026-02-13", title: "নোটিশ নমুনা ১", fileUrl: "/sample.pdf", category: "সাধারণ"},
  { id: "2", date: "2026-02-10", title: "নোটিশ নমুনা ২", fileUrl: "/sample.pdf", category: "পরীক্ষা"},
];

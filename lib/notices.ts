export type Audience = "office" | "students";

export type Notice = {
  id: string;
  date: string;      // "YYYY-MM-DD"
  title: string;
  fileUrl?: string;

  // NEW: separates Office NOC vs Students notices
  audience: Audience;

  // NEW: only for students notices page filter
  studentCategory?: string; // e.g. "পরীক্ষা", "ছুটি", "ক্লাস নোটিশ"
};

export const notices: Notice[] = [
  // Office NOC (will show only in /office-noc)
  {
    id: "o1",
    date: "2026-02-13",
    title: "অফিস NOC নমুনা ১",
    fileUrl: "/sample.pdf",
    audience: "office",
  },

  // Students notices (will show only in /notices)
  {
    id: "s1",
    date: "2026-02-10",
    title: "পরীক্ষার সময়সূচি সংক্রান্ত নোটিশ",
    fileUrl: "/sample.pdf",
    audience: "students",
    studentCategory: "পরীক্ষা",
  },

  {
    id: "s2",
    date: "2026-02-08",
    title: "ক্লাস বন্ধ সংক্রান্ত নোটিশ",
    fileUrl: "/sample.pdf",
    audience: "students",
    studentCategory: "ছুটি",
  },
];

// Convenience exports
export const studentNotices = notices.filter((n) => n.audience === "students");
export const officeNocs = notices.filter((n) => n.audience === "office");

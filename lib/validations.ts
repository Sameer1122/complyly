import { z } from "zod";

export const sendCodeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, "Code must be 6 digits"),
});

export const createReportSchema = z.object({
  category: z.string().min(1, "Category is required"),
});

export const analyseReportSchema = z.object({
  reportId: z.string().min(1, "Report ID is required"),
});

export const checkoutSchema = z.object({
  reportId: z.string().min(1, "Report ID is required"),
});

import React from "react";
import {
  renderToBuffer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ClauseAnalysis } from "./report-types";

const purple = "#AD6DF4";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    color: "#171717",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: purple,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: purple,
  },
  subtitle: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#171717",
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  riskLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  riskValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: purple,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
  },
  clause: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
  },
  clauseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  clauseTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  clauseRisk: {
    fontSize: 9,
    padding: "2 6",
    borderRadius: 3,
    color: "#ffffff",
  },
  clauseOriginal: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
    marginBottom: 4,
  },
  clauseExplanation: {
    fontSize: 10,
  },
  concern: {
    fontSize: 10,
    color: "#ef4444",
    marginTop: 4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 15,
    fontSize: 11,
  },
  listText: {
    flex: 1,
    fontSize: 10,
  },
  redFlag: {
    color: "#ef4444",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
});

function getRiskColor(level: string) {
  switch (level) {
    case "low":
      return "#22c55e";
    case "medium":
      return "#f59e0b";
    case "high":
      return "#ef4444";
    case "critical":
      return "#991b1b";
    default:
      return "#6b7280";
  }
}

interface ReportData {
  fileName: string;
  category: string;
  summary: string | null;
  riskScore: number | null;
  clauseAnalysis: ClauseAnalysis[] | null;
  recommendations: string[] | null;
  redFlags: string[] | null;
  actionChecklist: string[] | null;
}

export async function generateReportPDF(report: ReportData): Promise<Buffer> {
  const clauses = (report.clauseAnalysis ?? []) as ClauseAnalysis[];
  const recommendations = (report.recommendations ?? []) as string[];
  const redFlags = (report.redFlags ?? []) as string[];
  const checklist = (report.actionChecklist ?? []) as string[];

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Complyly Report</Text>
          <Text style={styles.subtitle}>
            {report.fileName} | {report.category} | Generated{" "}
            {new Date().toLocaleDateString("en-GB")}
          </Text>
        </View>

        <View style={styles.riskRow}>
          <Text style={styles.riskLabel}>Risk Score:</Text>
          <Text style={styles.riskValue}>
            {report.riskScore ?? "N/A"}/100
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{report.summary ?? ""}</Text>
        </View>

        {clauses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clause Analysis</Text>
            {clauses.map((clause, i) => (
              <View key={i} style={styles.clause}>
                <View style={styles.clauseHeader}>
                  <Text style={styles.clauseTitle}>
                    {clause.clauseNumber} — {clause.title}
                  </Text>
                  <Text
                    style={[
                      styles.clauseRisk,
                      { backgroundColor: getRiskColor(clause.riskLevel) },
                    ]}
                  >
                    {clause.riskLevel.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.clauseOriginal}>
                  &quot;{clause.originalText.slice(0, 200)}
                  {clause.originalText.length > 200 ? "..." : ""}&quot;
                </Text>
                <Text style={styles.clauseExplanation}>
                  {clause.explanation}
                </Text>
                {clause.concern && (
                  <Text style={styles.concern}>
                    ⚠ Concern: {clause.concern}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {redFlags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Red Flags</Text>
            {redFlags.map((flag, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={[styles.bullet, styles.redFlag]}>!</Text>
                <Text style={[styles.listText, styles.redFlag]}>{flag}</Text>
              </View>
            ))}
          </View>
        )}

        {recommendations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {recommendations.map((rec, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{rec}</Text>
              </View>
            ))}
          </View>
        )}

        {checklist.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Action Checklist</Text>
            {checklist.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>☐</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer}>
          Complyly — Understand Where You Stand | complyly.co.uk | This report
          is for informational purposes only and does not constitute legal
          advice.
        </Text>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return Buffer.from(buffer);
}

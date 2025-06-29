import { getTestResultsByUser, getTextReportsByUser } from "@/actions/other";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "@/lib/session";
import { format } from "date-fns";

export default async function TestResultsPage() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return <p className="text-center py-12 text-red-500">Unauthorized</p>;
  }

  const reports = await getTextReportsByUser(session.user.id);
  const results = await getTestResultsByUser(session.user.id);

  if (!reports.length) {
    return (
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-xl font-semibold">No Doc Reports Found</h2>
        <p className="text-muted-foreground mt-2">
          You haven&apos;t analyzed any medical doc reports yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="reports">Doc Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="results">
          <div className="flex flex-col gap-3 w-full min-w-full">
            {results.map((report) => (
              <div
                key={report.id}
                className="border bg-muted w-full shadow-sm p-3 rounded-lg"
              >
                <div className="pb-0 flex items-center justify-between gap-x-2">
                  <h1 className="">{report.prediction}</h1>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(report.createdAt), "PPpp")}
                  </p>
                  <div className="text-sm">
                    <Badge variant="outline" className="ml-1">
                      {report.testType}
                    </Badge>
                  </div>
                  {report.confidence && (
                    <div className="text-sm">
                      <strong>Confidence:</strong>{" "}
                      {report.confidence.toFixed(1)}%
                    </div>
                  )}
                </div>
                <div className="space-y-2 py-0">
                  <details className="">
                    <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                      Full Report
                    </summary>
                    <div className="mt-2 whitespace-pre-wrap">
                      {report.fullReport || "No detailed report available."}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="flex flex-col gap-3 w-full min-w-full">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border bg-muted w-full shadow-sm p-3 rounded-lg"
              >
                <div className="pb-0 flex items-center justify-between gap-x-2">
                  <h1 className="">{report.prediction}</h1>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(report.createdAt), "PPpp")}
                  </p>
                  <div className="text-sm">
                    <Badge variant="outline" className="ml-1">
                      {report.inputType}
                    </Badge>
                  </div>
                  {report.confidence && (
                    <div className="text-sm">
                      <strong>Confidence:</strong>{" "}
                      {report.confidence.toFixed(1)}%
                    </div>
                  )}
                </div>
                <div className="space-y-2 py-0">
                  <details className="">
                    <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                      Full Report
                    </summary>
                    <div className="mt-2 whitespace-pre-wrap">
                      {report.fullReport || "No detailed report available."}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

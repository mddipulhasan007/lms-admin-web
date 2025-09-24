"use client";
import * as React from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchTickets } from "@/lib/api";

export default function TicketListPage() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [q, setQ] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const data = await fetchTickets();
      setRows(Array.isArray(data) ? data : data?.results ?? []);
    })();
  }, []);

  const keys = React.useMemo(() => {
    if (!rows?.length) return [];
    return Object.keys(rows[0]).slice(0, 6);
  }, [rows]);

  const filtered = React.useMemo(
    () => rows.filter((r) =>
      JSON.stringify(r).toLowerCase().includes(q.toLowerCase())
    ),
    [rows, q]
  );

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Input
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button onClick={() => router.push("./create")}>Create</Button>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {keys.map((k) => (
                    <TableHead key={k}>{k}</TableHead>
                  ))}
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row: any) => (
                  <TableRow key={row.id ?? JSON.stringify(row)}>
                    {keys.map((k) => (
                      <TableCell key={k}>{String(row[k])}</TableCell>
                    ))}
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => router.push(String(row.id ?? ""))}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

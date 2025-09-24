"use client"
import * as React from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchTicketPrioritys } from "@/lib/api";

export default function TicketPriorityListPage() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [q, setQ] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const data = await fetchTicketPrioritys();
      setRows(Array.isArray(data) ? data : (data?.results ?? []));
    })();
  }, []);

  const keys = React.useMemo(() => {
    if (!rows?.length) return [];
    const k = Object.keys(rows[0]);
    return k.slice(0, 6);
  }, [rows]);

  const filtered = React.useMemo(() => rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q]);

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
            <Button onClick={() => router.push("/en/ticket-priority/create")}>Create</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {keys.map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  {keys.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
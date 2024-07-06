"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AddBookForm from "@/components/AddBookForm";
import UpdateBookForm from "@/components/UpdateBookForm";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialogtitre,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { BadgeMinus } from "lucide-react";
import { toast } from "sonner";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([
    // {
    //   _id: 1,
    //   titre: "The Great Gatsby",
    //   dispo: 1,
    //   type: "livres",
    //   exemplaires: ["ex1", "ex2"],
    //   détails: {
    //     année: 1925,
    //     edition: "Charles Scribner's Sons",
    //     auteur: "F. Scott Fitzgerald",
    //   },
    // },
    // {
    //   _id: 2,
    //   titre: "To Kill a Mockingbird",
    //   dispo: 0,
    //   type: "livres",
    //   exemplaires: ["ex1"],
    //   détails: {
    //     année: 1960,
    //     edition: "J.B. Lippincott & Co.",
    //     auteur: "Harper Lee",
    //   },
    // },
    // {
    //   _id: 3,
    //   titre: "1984",
    //   dispo: 1,
    //   type: "livres",
    //   exemplaires: ["ex1", "ex2", "ex3"],
    //   détails: {
    //     année: 1949,
    //     edition: "Secker & Warburg",
    //     auteur: "George Orwell",
    //   },
    // },
    // {
    //   _id: 4,
    //   titre: "National Geographic",
    //   dispo: 1,
    //   type: "periodique",
    //   détails: {
    //     date: "2023-01-01",
    //     peridicité: "mensuel",
    //     auteur: "National Geographic Society",
    //   },
    // },
    // {
    //   _id: 5,
    //   titre: "The Economist",
    //   dispo: 0,
    //   type: "periodique",
    //   détails: {
    //     date: "2023-03-15",
    //     peridicité: "hebdomadaire",
    //     auteur: "The Economist Group",
    //   },
    // },
  ]);
  useEffect(() => {
    axios
      .get("/api/documents/get")
      .then((response) => setBooks(response.data.data));
  }, []);
  useEffect(() => {
    axios
      .get(`/api/documents/get?title=${searchQuery}`)
      .then((response) => setBooks(response.data.data));
  }, [searchQuery]);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between w-screen">
        <div className="flex items-center gap-4">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            Library Management
          </Link>
          {/* <nav className="hidden md:flex items-center gap-4">
            <Link href="books" className="hover:text-accent" prefetch={false}>
              Books
            </Link>
            <Link
              href="requests"
              className="hover:text-accent"
              prefetch={false}
            >
              Requests
            </Link>
            <Link
              href="dashboard"
              className="hover:text-accent"
              prefetch={false}
            >
              Dashboard
            </Link>
          </nav> */}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /> */}
            <input
              type="search"
              placeholder="Search books..."
              onChangeCapture={(e) => setSearchQuery(e.target.value)}
              className="bg-primary-foreground/10 w-96 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <img
              src="https://avatars.githubusercontent.com/u/56311060?v=4&size=64"
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
            />
          </Button>
        </div>
      </header>
      <BooksTable books={books} />
    </main>
  );
}

function BooksTable({ books }: { books: any[] }) {
  const [focused, setFocused] = useState();

  const handleDelete = () => {
    axios
      .post("api/documents/delete", {
        _id: focused?._id,
      })
      .then((e) => {
        if (e.data?.error) throw e.data?.error;
        toast.success(e.data.message);
      })
      .catch((e) => {
        toast.error(JSON.stringify(e));
      });
  };
  if (books?.length == 0)
    return (
      <div className="flex  w-full flex-1 justify-center items-center px-24 py-16">
        <div className="w-full aspect-video flex flex-col justify-center items-center rounded-3xl shadow-inner bg-gradient-to-br from-blue-400 to-blue-500 animate-pulse gap-[10%]">
          <div className="w-1/5 animate-spin bg-blue-300 aspect-square rounded-xl " />
          <span className="text-xl uppercase text-white font-thin ">
            Loading . . .
          </span>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8 w-full">
      <div className="flex justify-end">
        <AddBookForm />
      </div>
      <span className="text-xl font-medium">Books</span>
      <hr />
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>titre</TableHead>
              <TableHead>Publication Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books?.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book._id}</TableCell>
                <TableCell>{book.titre}</TableCell>
                <TableCell>
                  {book.type == "livres"
                    ? book["détails"]["année"]
                    : book["détails"]["date"]}
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded-full capitalize p-2 ${
                      book.type == "livres" ? "bg-purple-300" : "bg-blue-300"
                    }`}
                  >
                    {book.type}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={book.dispo}
                      disabled
                      className={book.dispo ? "bg-green-400" : "bg-red-400"}
                    />
                    <span
                      className={`font-bold ${
                        book.dispo ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {book.dispo ? "Yes" : "No"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex  items-center  gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setFocused(book as any)}
                          size="sm"
                          variant="outline"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>

                      {focused && <UpdateBookForm focused={focused} />}
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <BadgeMinus
                            className="text-red-400"
                            onClick={() => setFocused(book as any)}
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="capitalize">
                            Delete Book
                          </DialogTitle>
                          <DialogDescription>
                            The option is irreversible.
                            <br />
                            Are you Sure you want to procced deleting the book !
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-red-400 text-white hover:bg-red-500"
                            onClick={handleDelete}
                          >
                            Confirmed
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

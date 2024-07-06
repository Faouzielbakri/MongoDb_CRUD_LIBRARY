import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import axios from "axios";

export default function Component() {
  const [title, setTitle] = useState("");
  const [dispo, setDispo] = useState(false);
  const [type, setType] = useState<"livres" | "periodique">("livres");
  const [date, setDate] = useState<Date>();

  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [exemplaires, setExemplaires] = useState<string[]>([""]);

  const [peridicite, setPeridicite] = useState<
    "hebdomadaire" | "mensuel" | "journalier"
  >("hebdomadaire");

  const handleAddBook = () => {
    axios
      .post("api/documents/add", {
        ouvrage:
          type == "periodique"
            ? {
                titre: title,
                dispo: dispo ? 1 : 0,
                type: "periodique",
                détails: {
                  date: date?.toISOString().slice(0, 10),
                  peridicité: peridicite,
                },
              }
            : {
                titre: title,
                dispo: dispo ? 1 : 0,
                type: "livres",
                exemplaires: exemplaires,
                détails: {
                  année: date?.getFullYear(),
                  edition: edition,
                  auteur: author,
                },
              },
      })
      .then((e) => {
        if (e.data?.error) throw e.data?.error;
        toast.success(e.data.message);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" onClick={handleAddBook}>
          Add Book/Periodical
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add {type == "periodique" ? "Periodical" : "Book"}
          </DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new{" "}
            {type == "periodique" ? "Periodical" : "Book"}.
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>
              {title.length
                ? title
                : `${type == "periodique" ? "Periodical" : "Book"} Title`}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 ">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder={`Enter ${
                    type == "periodique" ? "Periodical" : "Book"
                  } title`}
                  onChangeCapture={(e) => {
                    setTitle(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Ouvrages Type</Label>
                <Select
                  onValueChange={(e) => {
                    setType(e as any);
                  }}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem defaultChecked value="livres">
                      Livres
                    </SelectItem>
                    <SelectItem value="periodique">Periodique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="date" className="my-2">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={date}
                      onSelect={setDate}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-[0.7rem] flex-col flex">
                <Label htmlFor="available" className="my-2">
                  Available
                </Label>
                <Switch
                  aria-label="Available"
                  className="scale-150 ml-2"
                  checked={dispo}
                  onCheckedChange={setDispo}
                />
              </div>
            </div>
            <span className="mt-5">Details</span>
            <hr className="h-px  bg-gray-400 border-0 dark:bg-gray-700" />
            {type == "periodique" && (
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2 ">
                  <Label htmlFor="Peridicite" className="">
                    Peridicité
                  </Label>
                  <Select
                    name="Peridicite"
                    value={peridicite}
                    onValueChange={(e) => {
                      setPeridicite(e as any);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Peridicité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
                      <SelectItem value="mensuel">Mensuel</SelectItem>
                      <SelectItem value="journalier">Journalier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {/* Periodique */}
            {/*  Deatils */}
            {/* peridicité : 3 types*/}

            {/* book  */}
            {/* exemplaires */}
            {/*  Deatils */}
            {/* edition, author */}
            {type == "livres" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      placeholder={`Enter book Author`}
                      onChangeCapture={(e) => {
                        setAuthor(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Edition">Edition</Label>
                    <Input
                      id="Edition"
                      placeholder="Enter book Edition"
                      onChangeCapture={(e) => {
                        setEdition(e.currentTarget.value);
                      }}
                    />
                  </div>
                </div>
                {/* exemplaire */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exemplaires">Exemplaires</Label>
                    {exemplaires.map((e, i) => {
                      return (
                        <div className="flex gap-1" key={`elemt-${i}`}>
                          <Input
                            id="exemplaires"
                            placeholder="Enter book Exemplaires"
                            onChangeCapture={(ev) => {
                              console.log(ev.target.value, exemplaires);
                              setExemplaires((old) =>
                                old.map((el, ni) =>
                                  ni == i ? ev.target.value : el
                                )
                              );
                            }}
                          />
                          <Button
                            className={
                              i !== exemplaires.length - 1
                                ? `bg-red-400 hover:bg-red-500`
                                : ""
                            }
                            onClick={() => {
                              i == exemplaires.length - 1
                                ? setExemplaires((old) => [...old, ""])
                                : setExemplaires(
                                    exemplaires.filter((el, ni) => ni != i)
                                  );
                            }}
                          >
                            {i == exemplaires.length - 1 ? <Plus /> : <X />}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <DialogFooter>
          <Button onClick={handleAddBook}>
            Add New {type == "periodique" ? "Periodical" : "Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

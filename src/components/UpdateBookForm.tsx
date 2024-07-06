import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";

export default function Component({ focused }: { focused: any }) {
  const [title, setTitle] = useState(focused.titre);
  const [dispo, setDispo] = useState(!!focused.dispo);
  const [type, setType] = useState<"livres" | "periodique">(focused.type);
  const [date, setDate] = useState<Date>(
    focused?.détails?.année ?? focused?.détails?.date
  );

  const [author, setAuthor] = useState(focused?.détails?.auteur);
  const [edition, setEdition] = useState(focused?.détails?.edition);

  const [switchExemplaires, setSwitchExemplaires] = useState(false);
  const [exemplaires, setExemplaires] = useState<string[]>(
    focused?.exemplaires
  );

  const [peridicite, setPeridicite] = useState<
    "hebdomadaire" | "mensuel" | "journalier"
  >(focused?.détails?.peridicité ?? "hebdomadaire");

  const handleUpdateBook = () => {
    axios
      .post("api/documents/update", {
        _id: focused._id,
        update:
          type == "periodique"
            ? {
                titre: title,
                dispo: dispo ? 1 : 0,
                type: "periodique",
                détails: {
                  date: date,
                  peridicité: peridicite,
                },
              }
            : {
                titre: title,
                dispo: dispo ? 1 : 0,
                type: "livres",
                exemplaires: exemplaires,
                détails: {
                  année: date,
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="capitalize">{focused.type}</DialogTitle>
        <DialogDescription>The details of the given entry</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Title
          </Label>
          <Input
            id="titre"
            defaultValue={focused.titre}
            onChangeCapture={(e) => setTitle(e.target?.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="Available" className="text-right">
            Available
          </Label>
          <Switch
            defaultChecked={focused["dispo"]}
            onCheckedChange={(e) => setDispo(e)}
          />
        </div>
        {focused.type == "livres" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edition" className="text-right">
              Edition
            </Label>
            <Input
              id="edition"
              defaultValue={focused["détails"].edition}
              onChangeCapture={(e) => setEdition(e.target?.value)}
              className="col-span-3"
            />
          </div>
        )}
        {focused.type == "livres" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="auteur" className="text-right">
              Auteur
            </Label>
            <Input
              id="auteur"
              defaultValue={focused["détails"].auteur}
              onChangeCapture={(e) => setAuthor(e.target?.value)}
              className="col-span-3"
            />
          </div>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="année" className="text-right">
            {focused.type == "livres" ? "Année" : "Date"}
          </Label>
          <Input
            id="année"
            defaultValue={
              focused.type == "livres"
                ? focused["détails"].année
                : focused["détails"].date
            }
            onChangeCapture={(e) => setDate(e.target?.value)}
            className="col-span-3"
          />
        </div>
        {focused.type == "livres" &&
          (switchExemplaires ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="exemplaires"
                  onClick={() => setSwitchExemplaires(!switchExemplaires)}
                >
                  Exemplaires
                </Label>
                {exemplaires.map((e, i) => {
                  return (
                    <div className="flex gap-1" key={`elemt-${i}`}>
                      <Input
                        id="exemplaires"
                        placeholder="Enter book Exemplaires"
                        defaultValue={e}
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
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="exemplaires"
                className="text-right"
                onClick={() => setSwitchExemplaires(!switchExemplaires)}
              >
                Exemplaires
              </Label>
              <div className="grid-span-3 flex gap-1">
                {focused["exemplaires"]
                  ?.filter((e: any) => e.length)
                  ?.map((exp: any) => (
                    <span className="rounded-full py-1 px-4  text-center bg-blue-300 whitespace-nowrap">
                      {exp}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        {focused.type !== "livres" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="peridicité" className="text-right">
              Peridicité
            </Label>
            <Input
              id="peridicité"
              value={focused["détails"]["peridicité"]}
              className="col-span-3 capitalize"
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleUpdateBook}>
          Save changess
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

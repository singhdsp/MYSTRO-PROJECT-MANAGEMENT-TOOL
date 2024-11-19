"use client";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/ui/select";

import { workerLogin } from "../../../server/login";

import { useRouter} from "../../../../routing";

function ContractorLogin() {
  const [contractor, SetContractor] = useState("Albert");
  const [worker, setWorker] = useState("Mark");
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-8 max-w-80 p-4 rounded-xl shadow-2xl">
        <h1 className="text-center font-bold">Worker Login</h1>
        <Select value={contractor} onValueChange={SetContractor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Contractor" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="Albert">Albert</SelectItem>
          <SelectItem value="John">John</SelectItem>
          </SelectContent>
        </Select>
        <Select value={worker} onValueChange={setWorker}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Contractor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mark">Mark</SelectItem>
            <SelectItem value="James">James</SelectItem>          
            <SelectItem value="Kyle">Kyle</SelectItem>        
            <SelectItem value="Sara">Sara</SelectItem>
          </SelectContent>
        </Select>
        <button
          className="w-full py-3 rounded-lg bg-primary text-white font-semibold"
          onClick={async () => {
            const { status, message } = await workerLogin(contractor,worker);
            if (status == "error") {
              alert(message);
            }else{
              router.push("/Worker")
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default ContractorLogin;

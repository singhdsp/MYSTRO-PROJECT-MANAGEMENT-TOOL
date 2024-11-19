"use client";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/ui/select";

import { contractorLogin } from "../../../server/login";

import { useRouter} from "../../../../routing";

function ContractorLogin() {
  const [contractor, SetContractor] = useState("Albert");
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-8 max-w-80 p-4 rounded-xl shadow-2xl">
        <h1 className="text-center font-bold">Contractor Login</h1>
        <Select value={contractor} onValueChange={SetContractor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Contractor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Albert">Albert</SelectItem>
            <SelectItem value="John">John</SelectItem>
          </SelectContent>
        </Select>
        <button
          className="w-full py-3 rounded-lg bg-primary text-white font-semibold"
          onClick={async () => {
            const { status, message } = await contractorLogin(contractor);
            if (status == "error") {
              alert(message);
            }else{
              router.push("/Contractor")
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

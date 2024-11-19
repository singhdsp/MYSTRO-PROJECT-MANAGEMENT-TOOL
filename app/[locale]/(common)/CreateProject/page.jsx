"use client";
import React, { useState, useEffect } from "react";
import BackButton from "../../../components/BackButton";
import Image from "next/image";
import Selectperson from "../../../components/SelectPerson";
import SelectTeam from "../../../components/SelectTeam";
import AvatarView from "../../../components/AvatarView";
import { createProject } from "../../../server/project";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useNotyf } from "../../../../hooks/useNotyf";
import Loader from "../../../components/Loader";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [teamAdmin, setTeamAdmin] = useState(null);
  const [team, setTeam] = useState([]);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const notyf = useNotyf();
  const router = useRouter();
  const t = useTranslations("CreateProject");

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const validateProjectName = (name) => {
    const regex = /^[a-zA-Z0-9\s]{4,}$/;
    return regex.test(name);
  };

  const handleProjectNameChange = (e) => {
    const value = e.target.value;
    setProjectName(value);
  };

  const handleCreateProject = async () => {
    let newErrors = {};

    if (!validateProjectName(projectName)) {
      newErrors.projectName = "Project name should be at least 4 characters long and contain only letters and numbers.";
    }

    if (team.length === 0) {
      newErrors.team = "At least one team member is required.";
    }

    if (!teamAdmin) {
      newErrors.teamAdmin = "Team administrator is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProcessing(true);
    try {
      const { status, message, id } = await createProject(projectName, team, teamAdmin);
      if (status === "success") {
        notyf.success(message);
        setProjectName("");
        setTeam([]);
        setTeamAdmin(null);
        setErrors({});
        router.replace("/Contractor/ProjectDetails/" + id);
      } else {
        notyf.error(message);
      }
    } catch (err) {
      notyf.error(err.message);
    }
    setProcessing(false);   
  };

  return (
    <section className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="border-b border-b-secondary">
        <div className="p-4 flex items-center justify-center relative">
          <BackButton className={"absolute left-0"} />
          <h1 className="text-lg font-bold">{t('Title')}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-6 flex flex-col justify-center">
        {loading ? (
          <Skeleton className="w-full h-12 mb-4" />
        ) : (
          <div className="mb-4">
            <input
              type="text"
              placeholder={t('Inp1Placeholder')}
              value={projectName}
              onChange={handleProjectNameChange}
              className={`w-full px-4 py-3 font-semibold bg-secondary placeholder:text-placeholder rounded-md ${
                errors.projectName ? 'border-red-500' : ''
              }`}
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
            )}
          </div>
        )}
        <div className="my-2">
          <h3 className="text-lg font-semibold mb-3 ml-1">
            {t('AddMembers')}
          </h3>
          <div className="flex justify-between items-center space-x-2">
            {loading ? (
              <Skeleton className="w-36 h-9" />
            ) : team.length > 0 ? (
              <AvatarView users={team} />
            ) : null}
            {loading ? (
              <Skeleton className="w-9 h-9" />
            ) : (
              <Image
                src="/UserPlus.svg"
                alt="Add User"
                width={36}
                height={36}
                onClick={() => setTeamMenuOpen(true)}
              />
            )}
          </div>
          <SelectTeam
            isOpen={teamMenuOpen}
            setIsOpen={setTeamMenuOpen}
            team={team.length > 0 ? team : []}
            onClose={setTeam}
          />
          {errors.team && (
            <p className="text-red-500 text-sm mt-1">{errors.team}</p>
          )}
        </div>
        <div className="my-2">
          <h3 className="text-lg font-semibold mb-3 ml-1">
           {t('TeamAdmin')}
          </h3>
          {loading ? (
            <Skeleton className="w-full h-12" />
          ) : (
            <div>
              <Selectperson admin={teamAdmin} setTeamAdmin={setTeamAdmin} />
              {errors.teamAdmin && (
                <p className="text-red-500 text-sm mt-1">{errors.teamAdmin}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto mb-4 w-full px-4">
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <button
            className="bg-primary px-4 py-3 text-white font-semibold text-center rounded-md w-full disabled:opacity-50"
            disabled={processing}
            onClick={handleCreateProject}
          >
            {processing ? <Loader /> : t("CreateProject") }
          </button>
        )}
      </div>
    </section>
  );
}

export default CreateProject;
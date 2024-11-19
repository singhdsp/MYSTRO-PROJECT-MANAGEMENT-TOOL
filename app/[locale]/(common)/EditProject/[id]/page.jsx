"use client";
import React, { useState, useEffect } from "react";
import BackButton from "../../../../components/BackButton";
import Image from "next/image";
import Selectperson from "../../../../components/SelectPerson";
import SelectTeam from "../../../../components/SelectTeam";
import AvatarView from "../../../../components/AvatarView";
import { editProject, deleteProject, getProject } from "../../../../server/project";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useNotyf } from "../../../../../hooks/useNotyf";
import Loader from "../../../../components/Loader";
import { useParams, useRouter } from "next/navigation";
import Overlay from "../../../../components/Overlay";
import { useTranslations } from "next-intl";

function EditProject() {
  const [projectName, setProjectName] = useState("");
  const [teamAdmin, setTeamAdmin] = useState(null);
  const [team, setTeam] = useState([]);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const notyf = useNotyf();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;
  const t = useTranslations("EditProject");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProject(projectId);
        setProjectName(projectData.name);
        setTeamAdmin(projectData.admin);
        setTeam(projectData.members);
        setLoading(false);
      } catch (error) {
        notyf.error("Failed to load project data");
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, notyf]);

  const validateProjectName = (name) => {
    const regex = /^[a-zA-Z0-9\s]{4,}$/;
    return regex.test(name);
  };

  const handleProjectNameChange = (e) => {
    const value = e.target.value;
    setProjectName(value);
  };

  const handleEditProject = async () => {
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
      const { status, message, project } = await editProject(projectId, {
        name: projectName,
        members: team.map(member => member.id),
        admin: teamAdmin.id
      });
      if (status === "success") {
        notyf.success(message);
        router.replace("/Contractor/ProjectDetails/" + projectId);
      } else {
        notyf.error(message);
      }
    } catch (err) {
      notyf.error(err.message);
    }
    setProcessing(false);   
  };

  const handleDeleteProject = async () => {
    setProcessing(true);
    try {
      const { status, message } = await deleteProject(projectId);
      if (status === "success") {
        notyf.success(message);
        router.replace("/Contractor/ProjectDetails"); // Redirect to projects list
      } else {
        notyf.error(message);
      }
    } catch (err) {
      notyf.error(err.message);
    }
    setProcessing(false);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <section className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="border-b border-b-secondary">
        <div className="p-4 flex items-center justify-center relative">
          <BackButton className={"absolute left-0"} />
          <h1 className="text-lg font-bold">{t('EditProject')}</h1>
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
              placeholder={t('ProjectName')}
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
           {t('EditTeamMembers')}
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
            {t('TeamAdministrator')}
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

      <div className="mt-auto mb-4 w-full px-4 space-y-2">
        {loading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <>
            <button
              className="bg-primary px-4 py-3 text-white font-semibold text-center rounded-md w-full disabled:opacity-50"
              disabled={processing}
              onClick={handleEditProject}
            >
              {processing ? <Loader /> : t('SaveChanges')}
            </button>
            <button
              className="bg-red-500 px-4 py-3 text-white font-semibold text-center rounded-md w-full disabled:opacity-50"
              disabled={processing}
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              {t('DeleteProject')}
            </button>
          </>
        )}
      </div>

      <Overlay isOpen={isDeleteConfirmOpen} setIsOpen={setIsDeleteConfirmOpen}>
        <h1 className="text-center font-bold text-lg pt-3">{t('DeleteProject')}</h1>
        <p className="text-sm py-4 text-center font-medium">
          {t('DeleteConfirm')}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="font-semibold py-3 rounded-lg"
            onClick={() => setIsDeleteConfirmOpen(false)}
          >
            {t('Cancel')}
          </button>
          <button
            className="bg-red-500 text-white font-semibold py-3 rounded-lg disabled:bg-red-300"
            disabled={processing}
            onClick={handleDeleteProject}
          >
            {processing ? <Loader /> : t("Delete") }
          </button>
        </div>
      </Overlay>
    </section>
  );
}

export default EditProject;
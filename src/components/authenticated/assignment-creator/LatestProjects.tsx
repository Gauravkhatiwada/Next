import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReadMoreModal from "./ReadMoreModal";
import EditAssignmentModal from "./EditAssignmentModal";
import PaymentUploadModal from "@/components/authenticated/assignment-doer/Payment/PaymentUploadModal";
import DeleteModal from "./DeleteModal"; // Import DeleteModal component
import { getUserFromCookies } from "../../auth/token";

const user = getUserFromCookies();

export interface DataItem {
  id: number;
  projectStatus: string;
  scope: string;
  experienceYear: string;
  levelOfExperience: string;
  projectUrl: string;
  createdAt: string;
  updatedAt: string;
  projectDescription: string;
  skills?: string;
  budgets?: string;
  projects: {
    id: number;
    projectName: string;
    projectAmount: string;
    projectDeadline: string;
    budgets: string | null;
    createdAt: string;
    updatedAt: string;
    users: {
      id: number;
      name: string;
      email: string;
    };
    projectCategory: {
      id: number;
      category: string;
    } | null;
  };
}

const LatestProjects: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State for DeleteModal
  const [data, setData] = useState<DataItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DataItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DataItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/byUser?userId=${user.id}`,
        { withCredentials: true }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const truncateDescription = (projectDescription: string, length: number) => {
    if (typeof projectDescription !== "string") return "";
    if (projectDescription.length <= length) return projectDescription;
    return projectDescription.slice(0, length) + "...";
  };

  const handleReadMore = (project: DataItem) => {
    setSelectedProject(project);
    setEditModalVisible(false);
    setPaymentModalVisible(false);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const openEditModal = (project: DataItem) => {
    setSelectedProject(project);
    setEditModalVisible(true);
    setPaymentModalVisible(false);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedProject(null);
  };

  const openPaymentModal = (project: DataItem) => {
    setSelectedProject(project);
    setPaymentModalVisible(true);
    setEditModalVisible(false);
  };

  const closePaymentModal = () => {
    setPaymentModalVisible(false);
    setSelectedProject(null);
  };

  const openDeleteModal = (project: DataItem) => {
    setSelectedProject(project);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedProject(null);
  };

  const handleDelete = () => {
    fetchData();
    closeDeleteModal();
  };

  const handleSave = () => {
    closeEditModal();
  };

  const displayedData = data.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 cb-shadow cbg-color py-5">
      <div className="flex justify-center items-center primary-green p-2">
        Assignments You Have Posted
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold underline">
              {item.projects.projectName}
            </h2>
            <p>
              {truncateDescription(item.projects.projectAmount, 100)}
              <button
                onClick={() => handleReadMore(item)}
                className=" primary-navy-blue hover:underline"
                aria-label={`Read more about ${item.projects.projectName}`}
              >
                Read More
              </button>
            </p>
            <p className="text-sm">
              Project Amount: {item.projects.projectAmount}
            </p>
            <p className="text-sm">Deadline: {item.projects.projectDeadline}</p>
            <button
              className="mt-2 px-2 py-1 primary-orangebg text-white rounded-lg"
              onClick={() => openEditModal(item)}
              aria-label={`Edit assignment ${item.projects.projectName}`}
            >
              <h1 className="text-xs"> Edit Assignment </h1>
            </button>
            <button
              className="sm:hidden primary-orangebg rounded-lg text-white text-xs p-1 ml-2"
              onClick={() => openDeleteModal(item)} // Open DeleteModal on click
            >
              Delete<i className="px-1 fa-solid fa-trash"></i>
            </button>

            <button
              className="  mt-2 px-4 py-2 primary-navy-blue text-white text-sm rounded-lg underline hover:text-orange-500"
              onClick={() => openPaymentModal(item)}
              aria-label={`Add payment for ${item.projects.projectName}`}
            >
              Add Payment
            </button>

            <button
              className="hidden sm:block primary-orangebg rounded-lg text-white text-xs p-1 "
              onClick={() => openDeleteModal(item)} // Open DeleteModal on click
            >
              Delete<i className="px-1 fa-solid fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
      {visibleCount < data.length && (
        <div className="flex items-center justify-center">
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2  text-white rounded hover:bg-orange-600 primary-orangebg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {selectedProject &&
        !editModalVisible &&
        !paymentModalVisible &&
        !deleteModalVisible && (
          <ReadMoreModal project={selectedProject} onClose={handleClose} />
        )}
      {editModalVisible && selectedProject && (
        <EditAssignmentModal
          project={selectedProject}
          onClose={closeEditModal}
          onSave={handleSave}
        />
      )}
      {paymentModalVisible && selectedProject && (
        <PaymentUploadModal
          open={paymentModalVisible}
          onClose={closePaymentModal}
          projectId={selectedProject.projects.id}
          projectName={selectedProject.projects.projectName}
          name={selectedProject.projects.users.name}
        />
      )}
      {deleteModalVisible && selectedProject && (
        <DeleteModal
          projectId={selectedProject.projects.id}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default LatestProjects;

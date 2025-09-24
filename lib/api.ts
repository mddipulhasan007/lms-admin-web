const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("access_token"); // 🔑 get token
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/users/?limit=10`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // 🔑 send token
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createUser = async (payload: {
  name: string;
  email: string;
  mobile_number: string;
}) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔑 token header
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (uuid: string) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/users/${uuid}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch user");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// lib/api.ts
export const getUserProfile = async (uuid: string) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // ✅ make sure this is defined

  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/users/${uuid}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // always fetch fresh data
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user");
    }

    return data.data; // ✅ {id, uuid, name, email, status...}
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      credentials: "include", // important for session cookie
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Logout failed");
    }

    // ✅ Remove client storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_image");

    // ✅ Clear cookie for middleware
    document.cookie = "access_token=; path=/; max-age=0; secure; samesite=strict";

    return { success: true, message: "Logged out successfully" };
  } catch (err: any) {
    return { success: false, message: err.message || "Logout failed" };
  }
};

export const editUser = async (
  uuid: string,
  payload: { name: string; email: string; mobile_number: string }
) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/users/${uuid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export async function deleteUser(uuid: string, token: string) {
  const res = await fetch(`${apiBaseUrl}/api/v1/users/${uuid}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // ✅ must include Bearer
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete user");
  }

  return await res.json();
}

// --------- Course CRUD ----------

// Step 1: Create Course
export const createCourse = async (payload: any) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/courses/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create course");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const fetchCourses = async () => {
  try {
    const token = localStorage.getItem("access_token"); // 🔑 get token
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/courses/?limit=10`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // 🔑 send token
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export async function deleteCourse(uuid: string, token: string) {
  const res = await fetch(`${apiBaseUrl}/api/v1/courses/${uuid}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, // ✅ must include Bearer
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete course");
  }

  return await res.json();
}

// Step 2: Create Course Resource
export const createCourseResource = async (payload: any) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/course_resources/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create course resource");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating course resource:", error);
    throw error;
  }
};

// Step 3: Create Course Lesson
export const createCourseLesson = async (payload: any) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/course_lessons/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create lesson");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

// Step 4: Create Course Lecture
export const createCourseLecture = async (payload: any) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/course_lectures/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create lecture");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating lecture:", error);
    throw error;
  }
};

// --------- Lookups (for dropdowns) ----------

export const getCategories = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/categorys/paginated?skip=0&limit=50`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [] }; // safe fallback
  }
};

export const getCourseLanguages = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token found. Please login.");

    const res = await fetch(`${apiBaseUrl}/api/v1/course_languages/paginated?skip=0&limit=50`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch course languages");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course languages:", error);
    return { data: [] };
  }
};


export const fetchDevices = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/devices/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch devices");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const fetchDeviceUsers = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/device_users/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch device users");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching device users:", error);
    return [];
  }
};

export const fetchRoles = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/roles/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch roles");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const fetchRolePermissions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/role_permissions/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch role permissions");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    return [];
  }
};

export const fetchUserPermissions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/user_permissions/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user permissions");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    return [];
  }
};

export const fetchUserRoles = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/user_roles/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user roles");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }
};

export const fetchArchiveVideos = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/archive_videos/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch archive videos");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching archive videos:", error);
    return [];
  }
};

export const createArchiveVideo = async (data: {
  course_id: number;
  batch_id: number;
  lesson_id: number;
  lecture_id: number;
  title: string;
  description: string;
  video_url: string;
  duration_seconds: number;
  status: number;
  uuid: string;
}) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/archive_videos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.detail || "Failed to create archive video");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating archive video:", error);
    throw error;
  }
};


export const fetchZoomSetting = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/zoom_settings/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch zoom settings");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching zoom settings:", error);
    return [];
  }
};

export const createZoomSettings = async (payload: any) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/zoom_settings/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.detail || "Failed to create zoom settings");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating zoom settings:", error);
    return null;
  }
};

export const fetchSettings = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/settings/?limit=10`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch settings");
    }

    return await res.json(); // Returns an array of users
  } catch (error) {
    console.error("Error fetching settings:", error);
    return [];
  }
};


// Auto-generated CRUD for assignment
export const fetchAssignments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/assignments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch assignment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return [];
  }
};

export const getAssignment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/assignments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read assignment");
    return await res.json();
  } catch (error) {
    console.error("Error reading assignment:", error);
    throw error;
  }
};

export const createAssignment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create assignment");
  return await res.json();
};

export const updateAssignment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update assignment");
  return await res.json();
};

export const deleteAssignment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete assignment");
  return await res.json();
};


// Auto-generated CRUD for assignment-file
export const fetchAssignmentFiles = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/assignment_files/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch assignment-file");
    return await res.json();
  } catch (error) {
    console.error("Error fetching assignment-file:", error);
    return [];
  }
};

export const getAssignmentFile = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/assignment_files/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read assignment-file");
    return await res.json();
  } catch (error) {
    console.error("Error reading assignment-file:", error);
    throw error;
  }
};

export const createAssignmentFile = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignment_files/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create assignment-file");
  return await res.json();
};

export const updateAssignmentFile = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignment_files/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update assignment-file");
  return await res.json();
};

export const deleteAssignmentFile = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignment_files/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete assignment-file");
  return await res.json();
};


// Auto-generated CRUD for assignment-submit
export const fetchAssignmentSubmits = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/assignment_submits/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch assignment-submit");
    return await res.json();
  } catch (error) {
    console.error("Error fetching assignment-submit:", error);
    return [];
  }
};

export const getAssignmentSubmit = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/assignment_submits/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read assignment-submit");
    return await res.json();
  } catch (error) {
    console.error("Error reading assignment-submit:", error);
    throw error;
  }
};

export const createAssignmentSubmit = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignment_submits/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create assignment-submit");
  return await res.json();
};

export const updateAssignmentSubmit = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignment_submits/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update assignment-submit");
  return await res.json();
};

export const deleteAssignmentSubmit = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/assignment_submits/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete assignment-submit");
  return await res.json();
};


// Auto-generated CRUD for audit-log
export const fetchAuditLogs = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/audit_logs/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch audit-log");
    return await res.json();
  } catch (error) {
    console.error("Error fetching audit-log:", error);
    return [];
  }
};

export const getAuditLog = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/audit_logs/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read audit-log");
    return await res.json();
  } catch (error) {
    console.error("Error reading audit-log:", error);
    throw error;
  }
};

export const createAuditLog = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/audit_logs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create audit-log");
  return await res.json();
};

export const updateAuditLog = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/audit_logs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update audit-log");
  return await res.json();
};

export const deleteAuditLog = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/audit_logs/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete audit-log");
  return await res.json();
};


// Auto-generated CRUD for batch
export const fetchBatchs = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batchs/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch batch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching batch:", error);
    return [];
  }
};

export const getBatch = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batchs/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read batch");
    return await res.json();
  } catch (error) {
    console.error("Error reading batch:", error);
    throw error;
  }
};

export const createBatch = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batchs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create batch");
  return await res.json();
};

export const updateBatch = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batchs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update batch");
  return await res.json();
};

export const deleteBatch = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batchs/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete batch");
  return await res.json();
};


// Auto-generated CRUD for batch-course
export const fetchBatchCourses = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batch_courses/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch batch-course");
    return await res.json();
  } catch (error) {
    console.error("Error fetching batch-course:", error);
    return [];
  }
};

export const getBatchCourse = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batch_courses/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read batch-course");
    return await res.json();
  } catch (error) {
    console.error("Error reading batch-course:", error);
    throw error;
  }
};

export const createBatchCourse = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_courses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create batch-course");
  return await res.json();
};

export const updateBatchCourse = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update batch-course");
  return await res.json();
};

export const deleteBatchCourse = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_courses/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete batch-course");
  return await res.json();
};


// Auto-generated CRUD for batch-enrollment
export const fetchBatchEnrollments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batch_enrollments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch batch-enrollment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching batch-enrollment:", error);
    return [];
  }
};

export const getBatchEnrollment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batch_enrollments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read batch-enrollment");
    return await res.json();
  } catch (error) {
    console.error("Error reading batch-enrollment:", error);
    throw error;
  }
};

export const createBatchEnrollment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_enrollments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create batch-enrollment");
  return await res.json();
};

export const updateBatchEnrollment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_enrollments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update batch-enrollment");
  return await res.json();
};

export const deleteBatchEnrollment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_enrollments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete batch-enrollment");
  return await res.json();
};


// Auto-generated CRUD for batch-pricing
export const fetchBatchPricings = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batch_pricings/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch batch-pricing");
    return await res.json();
  } catch (error) {
    console.error("Error fetching batch-pricing:", error);
    return [];
  }
};

export const getBatchPricing = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/batch_pricings/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read batch-pricing");
    return await res.json();
  } catch (error) {
    console.error("Error reading batch-pricing:", error);
    throw error;
  }
};

export const createBatchPricing = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_pricings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create batch-pricing");
  return await res.json();
};

export const updateBatchPricing = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_pricings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update batch-pricing");
  return await res.json();
};

export const deleteBatchPricing = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/batch_pricings/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete batch-pricing");
  return await res.json();
};


// Auto-generated CRUD for cart-management
export const fetchCartManagements = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/cart_managements/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch cart-management");
    return await res.json();
  } catch (error) {
    console.error("Error fetching cart-management:", error);
    return [];
  }
};

export const getCartManagement = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/cart_managements/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read cart-management");
    return await res.json();
  } catch (error) {
    console.error("Error reading cart-management:", error);
    throw error;
  }
};

export const createCartManagement = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/cart_managements/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create cart-management");
  return await res.json();
};

export const updateCartManagement = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/cart_managements/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update cart-management");
  return await res.json();
};

export const deleteCartManagement = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/cart_managements/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete cart-management");
  return await res.json();
};


// Auto-generated CRUD for category
export const fetchCategorys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/categorys/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch category");
    return await res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
};

export const getCategory = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/categorys/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read category");
    return await res.json();
  } catch (error) {
    console.error("Error reading category:", error);
    throw error;
  }
};

export const createCategory = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/categorys/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
};

export const updateCategory = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/categorys/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return await res.json();
};

export const deleteCategory = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/categorys/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return await res.json();
};


// Auto-generated CRUD for certificate
export const fetchCertificates = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/certificates/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch certificate");
    return await res.json();
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return [];
  }
};

export const getCertificate = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/certificates/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read certificate");
    return await res.json();
  } catch (error) {
    console.error("Error reading certificate:", error);
    throw error;
  }
};

export const createCertificate = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/certificates/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create certificate");
  return await res.json();
};

export const updateCertificate = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/certificates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update certificate");
  return await res.json();
};

export const deleteCertificate = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/certificates/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete certificate");
  return await res.json();
};


// Auto-generated CRUD for client
export const fetchClients = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/clients/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch client");
    return await res.json();
  } catch (error) {
    console.error("Error fetching client:", error);
    return [];
  }
};

export const getClient = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/clients/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read client");
    return await res.json();
  } catch (error) {
    console.error("Error reading client:", error);
    throw error;
  }
};

export const createClient = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/clients/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create client");
  return await res.json();
};

export const updateClient = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update client");
  return await res.json();
};

export const deleteClient = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/clients/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete client");
  return await res.json();
};


// Auto-generated CRUD for coupon
export const fetchCoupons = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/coupons/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch coupon");
    return await res.json();
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return [];
  }
};

export const getCoupon = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/coupons/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read coupon");
    return await res.json();
  } catch (error) {
    console.error("Error reading coupon:", error);
    throw error;
  }
};

export const createCoupon = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/coupons/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create coupon");
  return await res.json();
};

export const updateCoupon = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/coupons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update coupon");
  return await res.json();
};

export const deleteCoupon = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/coupons/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete coupon");
  return await res.json();
};


// Auto-generated CRUD for coupon-batch
export const fetchCouponBatchs = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/coupon_batchs/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch coupon-batch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching coupon-batch:", error);
    return [];
  }
};

export const getCouponBatch = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/coupon_batchs/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read coupon-batch");
    return await res.json();
  } catch (error) {
    console.error("Error reading coupon-batch:", error);
    throw error;
  }
};

export const createCouponBatch = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/coupon_batchs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create coupon-batch");
  return await res.json();
};

export const updateCouponBatch = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/coupon_batchs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update coupon-batch");
  return await res.json();
};

export const deleteCouponBatch = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/coupon_batchs/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete coupon-batch");
  return await res.json();
};


// // Auto-generated CRUD for course
// export const fetchCourses = async () => {
//   try {
//     const res = await fetch(`${apiBaseUrl}/api/v1/courses/`, {
//       headers: { Accept: "application/json" },
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch course");
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching course:", error);
//     return [];
//   }
// };

// export const getCourse = async (id: string | number) => {
//   try {
//     const res = await fetch(`${apiBaseUrl}/api/v1/courses/${id}`, {
//       headers: { Accept: "application/json" },
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to read course");
//     return await res.json();
//   } catch (error) {
//     console.error("Error reading course:", error);
//     throw error;
//   }
// };

// export const createCourse = async (payload: any) => {
//   const res = await fetch(`${apiBaseUrl}/api/v1/courses/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error("Failed to create course");
//   return await res.json();
// };

// export const updateCourse = async (id: string | number, payload: any) => {
//   const res = await fetch(`${apiBaseUrl}/api/v1/courses/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error("Failed to update course");
//   return await res.json();
// };

// export const deleteCourse = async (id: string | number) => {
//   const res = await fetch(`${apiBaseUrl}/api/v1/courses/$ {id}`.replace(" $ ", ""), {
//     method: "DELETE",
//     headers: { Accept: "application/json" },
//   });
//   if (!res.ok) throw new Error("Failed to delete course");
//   return await res.json();
// };


// Auto-generated CRUD for course-enrollment
export const fetchCourseEnrollments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_enrollments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-enrollment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-enrollment:", error);
    return [];
  }
};

export const getCourseEnrollment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_enrollments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-enrollment");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-enrollment:", error);
    throw error;
  }
};

export const createCourseEnrollment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_enrollments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create course-enrollment");
  return await res.json();
};

export const updateCourseEnrollment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_enrollments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-enrollment");
  return await res.json();
};

export const deleteCourseEnrollment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_enrollments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-enrollment");
  return await res.json();
};


// Auto-generated CRUD for course-installment-plan
export const fetchCourseInstallmentPlans = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_installment_plans/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-installment-plan");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-installment-plan:", error);
    return [];
  }
};

export const getCourseInstallmentPlan = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_installment_plans/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-installment-plan");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-installment-plan:", error);
    throw error;
  }
};

export const createCourseInstallmentPlan = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_installment_plans/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create course-installment-plan");
  return await res.json();
};

export const updateCourseInstallmentPlan = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_installment_plans/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-installment-plan");
  return await res.json();
};

export const deleteCourseInstallmentPlan = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_installment_plans/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-installment-plan");
  return await res.json();
};


// Auto-generated CRUD for course-instructor
export const fetchCourseInstructors = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_instructors/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-instructor");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-instructor:", error);
    return [];
  }
};

export const getCourseInstructor = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_instructors/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-instructor");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-instructor:", error);
    throw error;
  }
};

export const createCourseInstructor = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_instructors/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create course-instructor");
  return await res.json();
};

export const updateCourseInstructor = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_instructors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-instructor");
  return await res.json();
};

export const deleteCourseInstructor = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_instructors/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-instructor");
  return await res.json();
};


// Auto-generated CRUD for course-language
export const fetchCourseLanguages = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_languages/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-language");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-language:", error);
    return [];
  }
};

export const getCourseLanguage = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_languages/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-language");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-language:", error);
    throw error;
  }
};

export const createCourseLanguage = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_languages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create course-language");
  return await res.json();
};

export const updateCourseLanguage = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_languages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-language");
  return await res.json();
};

export const deleteCourseLanguage = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_languages/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-language");
  return await res.json();
};


// Auto-generated CRUD for course-lecture
export const fetchCourseLectures = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_lectures/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-lecture");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-lecture:", error);
    return [];
  }
};

export const getCourseLecture = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_lectures/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-lecture");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-lecture:", error);
    throw error;
  }
};

export const updateCourseLecture = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_lectures/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-lecture");
  return await res.json();
};

export const deleteCourseLecture = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_lectures/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-lecture");
  return await res.json();
};


// Auto-generated CRUD for course-lesson
export const fetchCourseLessons = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_lessons/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-lesson");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-lesson:", error);
    return [];
  }
};

export const getCourseLesson = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_lessons/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-lesson");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-lesson:", error);
    throw error;
  }
};

export const updateCourseLesson = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_lessons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-lesson");
  return await res.json();
};

export const deleteCourseLesson = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_lessons/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-lesson");
  return await res.json();
};


// Auto-generated CRUD for course-resource
export const fetchCourseResources = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_resources/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-resource");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-resource:", error);
    return [];
  }
};

export const getCourseResource = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_resources/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-resource");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-resource:", error);
    throw error;
  }
};

export const updateCourseResource = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_resources/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-resource");
  return await res.json();
};

export const deleteCourseResource = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_resources/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-resource");
  return await res.json();
};


// Auto-generated CRUD for course-tag
export const fetchCourseTags = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_tags/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch course-tag");
    return await res.json();
  } catch (error) {
    console.error("Error fetching course-tag:", error);
    return [];
  }
};

export const getCourseTag = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/course_tags/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read course-tag");
    return await res.json();
  } catch (error) {
    console.error("Error reading course-tag:", error);
    throw error;
  }
};

export const createCourseTag = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_tags/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create course-tag");
  return await res.json();
};

export const updateCourseTag = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_tags/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update course-tag");
  return await res.json();
};

export const deleteCourseTag = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/course_tags/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete course-tag");
  return await res.json();
};


// Auto-generated CRUD for discussion
export const fetchDiscussions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/discussions/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch discussion");
    return await res.json();
  } catch (error) {
    console.error("Error fetching discussion:", error);
    return [];
  }
};

export const getDiscussion = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/discussions/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read discussion");
    return await res.json();
  } catch (error) {
    console.error("Error reading discussion:", error);
    throw error;
  }
};

export const createDiscussion = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/discussions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create discussion");
  return await res.json();
};

export const updateDiscussion = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/discussions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update discussion");
  return await res.json();
};

export const deleteDiscussion = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/discussions/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete discussion");
  return await res.json();
};


// Auto-generated CRUD for email-notification-setting
export const fetchEmailNotificationSettings = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/email_notification_settings/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch email-notification-setting");
    return await res.json();
  } catch (error) {
    console.error("Error fetching email-notification-setting:", error);
    return [];
  }
};

export const getEmailNotificationSetting = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/email_notification_settings/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read email-notification-setting");
    return await res.json();
  } catch (error) {
    console.error("Error reading email-notification-setting:", error);
    throw error;
  }
};

export const createEmailNotificationSetting = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/email_notification_settings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create email-notification-setting");
  return await res.json();
};

export const updateEmailNotificationSetting = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/email_notification_settings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update email-notification-setting");
  return await res.json();
};

export const deleteEmailNotificationSetting = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/email_notification_settings/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete email-notification-setting");
  return await res.json();
};


// Auto-generated CRUD for email-template
export const fetchEmailTemplates = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/email_templates/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch email-template");
    return await res.json();
  } catch (error) {
    console.error("Error fetching email-template:", error);
    return [];
  }
};

export const getEmailTemplate = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/email_templates/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read email-template");
    return await res.json();
  } catch (error) {
    console.error("Error reading email-template:", error);
    throw error;
  }
};

export const createEmailTemplate = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/email_templates/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create email-template");
  return await res.json();
};

export const updateEmailTemplate = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/email_templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update email-template");
  return await res.json();
};

export const deleteEmailTemplate = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/email_templates/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete email-template");
  return await res.json();
};


// Auto-generated CRUD for exam
export const fetchExams = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/exams/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch exam");
    return await res.json();
  } catch (error) {
    console.error("Error fetching exam:", error);
    return [];
  }
};

export const getExam = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/exams/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read exam");
    return await res.json();
  } catch (error) {
    console.error("Error reading exam:", error);
    throw error;
  }
};

export const createExam = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/exams/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create exam");
  return await res.json();
};

export const updateExam = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/exams/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update exam");
  return await res.json();
};

export const deleteExam = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/exams/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete exam");
  return await res.json();
};


// Auto-generated CRUD for exam-question
export const fetchExamQuestions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/exam_questions/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch exam-question");
    return await res.json();
  } catch (error) {
    console.error("Error fetching exam-question:", error);
    return [];
  }
};

export const getExamQuestion = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/exam_questions/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read exam-question");
    return await res.json();
  } catch (error) {
    console.error("Error reading exam-question:", error);
    throw error;
  }
};

export const createExamQuestion = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/exam_questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create exam-question");
  return await res.json();
};

export const updateExamQuestion = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/exam_questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update exam-question");
  return await res.json();
};

export const deleteExamQuestion = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/exam_questions/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete exam-question");
  return await res.json();
};


// Auto-generated CRUD for forum-category
export const fetchForumCategorys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/forum_categorys/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch forum-category");
    return await res.json();
  } catch (error) {
    console.error("Error fetching forum-category:", error);
    return [];
  }
};

export const getForumCategory = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/forum_categorys/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read forum-category");
    return await res.json();
  } catch (error) {
    console.error("Error reading forum-category:", error);
    throw error;
  }
};

export const createForumCategory = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_categorys/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create forum-category");
  return await res.json();
};

export const updateForumCategory = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_categorys/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update forum-category");
  return await res.json();
};

export const deleteForumCategory = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_categorys/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete forum-category");
  return await res.json();
};


// Auto-generated CRUD for forum-post
export const fetchForumPosts = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/forum_posts/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch forum-post");
    return await res.json();
  } catch (error) {
    console.error("Error fetching forum-post:", error);
    return [];
  }
};

export const getForumPost = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/forum_posts/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read forum-post");
    return await res.json();
  } catch (error) {
    console.error("Error reading forum-post:", error);
    throw error;
  }
};

export const createForumPost = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create forum-post");
  return await res.json();
};

export const updateForumPost = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update forum-post");
  return await res.json();
};

export const deleteForumPost = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_posts/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete forum-post");
  return await res.json();
};


// Auto-generated CRUD for forum-post-comment
export const fetchForumPostComments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/forum_post_comments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch forum-post-comment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching forum-post-comment:", error);
    return [];
  }
};

export const getForumPostComment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/forum_post_comments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read forum-post-comment");
    return await res.json();
  } catch (error) {
    console.error("Error reading forum-post-comment:", error);
    throw error;
  }
};

export const createForumPostComment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_post_comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create forum-post-comment");
  return await res.json();
};

export const updateForumPostComment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_post_comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update forum-post-comment");
  return await res.json();
};

export const deleteForumPostComment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/forum_post_comments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete forum-post-comment");
  return await res.json();
};


// Auto-generated CRUD for installment-payment
export const fetchInstallmentPayments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/installment_payments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch installment-payment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching installment-payment:", error);
    return [];
  }
};

export const getInstallmentPayment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/installment_payments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read installment-payment");
    return await res.json();
  } catch (error) {
    console.error("Error reading installment-payment:", error);
    throw error;
  }
};

export const createInstallmentPayment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/installment_payments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create installment-payment");
  return await res.json();
};

export const updateInstallmentPayment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/installment_payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update installment-payment");
  return await res.json();
};

export const deleteInstallmentPayment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/installment_payments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete installment-payment");
  return await res.json();
};


// Auto-generated CRUD for installment-plan
export const fetchInstallmentPlans = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/installment_plans/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch installment-plan");
    return await res.json();
  } catch (error) {
    console.error("Error fetching installment-plan:", error);
    return [];
  }
};

export const getInstallmentPlan = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/installment_plans/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read installment-plan");
    return await res.json();
  } catch (error) {
    console.error("Error reading installment-plan:", error);
    throw error;
  }
};

export const createInstallmentPlan = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/installment_plans/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create installment-plan");
  return await res.json();
};

export const updateInstallmentPlan = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/installment_plans/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update installment-plan");
  return await res.json();
};

export const deleteInstallmentPlan = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/installment_plans/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete installment-plan");
  return await res.json();
};


// Auto-generated CRUD for instructor
export const fetchInstructors = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/instructors/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch instructor");
    return await res.json();
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return [];
  }
};

export const getInstructor = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/instructors/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read instructor");
    return await res.json();
  } catch (error) {
    console.error("Error reading instructor:", error);
    throw error;
  }
};

export const createInstructor = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructors/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create instructor");
  return await res.json();
};

export const updateInstructor = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update instructor");
  return await res.json();
};

export const deleteInstructor = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructors/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete instructor");
  return await res.json();
};


// Auto-generated CRUD for instructor-certificate
export const fetchInstructorCertificates = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/instructor_certificates/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch instructor-certificate");
    return await res.json();
  } catch (error) {
    console.error("Error fetching instructor-certificate:", error);
    return [];
  }
};

export const getInstructorCertificate = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/instructor_certificates/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read instructor-certificate");
    return await res.json();
  } catch (error) {
    console.error("Error reading instructor-certificate:", error);
    throw error;
  }
};

export const createInstructorCertificate = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructor_certificates/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create instructor-certificate");
  return await res.json();
};

export const updateInstructorCertificate = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructor_certificates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update instructor-certificate");
  return await res.json();
};

export const deleteInstructorCertificate = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructor_certificates/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete instructor-certificate");
  return await res.json();
};


// Auto-generated CRUD for instructor-skill
export const fetchInstructorSkills = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/instructor_skills/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch instructor-skill");
    return await res.json();
  } catch (error) {
    console.error("Error fetching instructor-skill:", error);
    return [];
  }
};

export const getInstructorSkill = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/instructor_skills/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read instructor-skill");
    return await res.json();
  } catch (error) {
    console.error("Error reading instructor-skill:", error);
    throw error;
  }
};

export const createInstructorSkill = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructor_skills/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create instructor-skill");
  return await res.json();
};

export const updateInstructorSkill = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructor_skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update instructor-skill");
  return await res.json();
};

export const deleteInstructorSkill = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/instructor_skills/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete instructor-skill");
  return await res.json();
};


// Auto-generated CRUD for language
export const fetchLanguages = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/languages/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch language");
    return await res.json();
  } catch (error) {
    console.error("Error fetching language:", error);
    return [];
  }
};

export const getLanguage = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/languages/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read language");
    return await res.json();
  } catch (error) {
    console.error("Error reading language:", error);
    throw error;
  }
};

export const createLanguage = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/languages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create language");
  return await res.json();
};

export const updateLanguage = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/languages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update language");
  return await res.json();
};

export const deleteLanguage = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/languages/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete language");
  return await res.json();
};


// Auto-generated CRUD for leader-board
export const fetchLeaderBoards = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/leader_boards/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch leader-board");
    return await res.json();
  } catch (error) {
    console.error("Error fetching leader-board:", error);
    return [];
  }
};

export const getLeaderBoard = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/leader_boards/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read leader-board");
    return await res.json();
  } catch (error) {
    console.error("Error reading leader-board:", error);
    throw error;
  }
};

export const createLeaderBoard = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/leader_boards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create leader-board");
  return await res.json();
};

export const updateLeaderBoard = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/leader_boards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update leader-board");
  return await res.json();
};

export const deleteLeaderBoard = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/leader_boards/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete leader-board");
  return await res.json();
};


// Auto-generated CRUD for lesson-exam
export const fetchLessonExams = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exams/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch lesson-exam");
    return await res.json();
  } catch (error) {
    console.error("Error fetching lesson-exam:", error);
    return [];
  }
};

export const getLessonExam = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exams/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read lesson-exam");
    return await res.json();
  } catch (error) {
    console.error("Error reading lesson-exam:", error);
    throw error;
  }
};

export const createLessonExam = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exams/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create lesson-exam");
  return await res.json();
};

export const updateLessonExam = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exams/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update lesson-exam");
  return await res.json();
};

export const deleteLessonExam = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exams/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete lesson-exam");
  return await res.json();
};


// Auto-generated CRUD for lesson-exam-question
export const fetchLessonExamQuestions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exam_questions/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch lesson-exam-question");
    return await res.json();
  } catch (error) {
    console.error("Error fetching lesson-exam-question:", error);
    return [];
  }
};

export const getLessonExamQuestion = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exam_questions/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read lesson-exam-question");
    return await res.json();
  } catch (error) {
    console.error("Error reading lesson-exam-question:", error);
    throw error;
  }
};

export const createLessonExamQuestion = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exam_questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create lesson-exam-question");
  return await res.json();
};

export const updateLessonExamQuestion = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exam_questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update lesson-exam-question");
  return await res.json();
};

export const deleteLessonExamQuestion = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_exam_questions/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete lesson-exam-question");
  return await res.json();
};


// Auto-generated CRUD for lesson-question
export const fetchLessonQuestions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_questions/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch lesson-question");
    return await res.json();
  } catch (error) {
    console.error("Error fetching lesson-question:", error);
    return [];
  }
};

export const getLessonQuestion = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_questions/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read lesson-question");
    return await res.json();
  } catch (error) {
    console.error("Error reading lesson-question:", error);
    throw error;
  }
};

export const createLessonQuestion = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create lesson-question");
  return await res.json();
};

export const updateLessonQuestion = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update lesson-question");
  return await res.json();
};

export const deleteLessonQuestion = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_questions/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete lesson-question");
  return await res.json();
};


// Auto-generated CRUD for lesson-question-option
export const fetchLessonQuestionOptions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_question_options/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch lesson-question-option");
    return await res.json();
  } catch (error) {
    console.error("Error fetching lesson-question-option:", error);
    return [];
  }
};

export const getLessonQuestionOption = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/lesson_question_options/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read lesson-question-option");
    return await res.json();
  } catch (error) {
    console.error("Error reading lesson-question-option:", error);
    throw error;
  }
};

export const createLessonQuestionOption = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_question_options/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create lesson-question-option");
  return await res.json();
};

export const updateLessonQuestionOption = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_question_options/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update lesson-question-option");
  return await res.json();
};

export const deleteLessonQuestionOption = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/lesson_question_options/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete lesson-question-option");
  return await res.json();
};


// Auto-generated CRUD for live-class
export const fetchLiveClass = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/live_class/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch live-class");
    return await res.json();
  } catch (error) {
    console.error("Error fetching live-class:", error);
    return [];
  }
};

export const getLiveClass = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/live_class/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read live-class");
    return await res.json();
  } catch (error) {
    console.error("Error reading live-class:", error);
    throw error;
  }
};

export const createLiveClass = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/live_class/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create live-class");
  return await res.json();
};

export const updateLiveClass = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/live_class/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update live-class");
  return await res.json();
};

export const deleteLiveClass = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/live_class/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete live-class");
  return await res.json();
};


// Auto-generated CRUD for menu
export const fetchMenus = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/menus/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch menu");
    return await res.json();
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

export const getMenu = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/menus/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read menu");
    return await res.json();
  } catch (error) {
    console.error("Error reading menu:", error);
    throw error;
  }
};

export const createMenu = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/menus/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create menu");
  return await res.json();
};

export const updateMenu = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/menus/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update menu");
  return await res.json();
};

export const deleteMenu = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/menus/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete menu");
  return await res.json();
};


// Auto-generated CRUD for meta
export const fetchMetas = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/metas/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch meta");
    return await res.json();
  } catch (error) {
    console.error("Error fetching meta:", error);
    return [];
  }
};

export const getMeta = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/metas/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read meta");
    return await res.json();
  } catch (error) {
    console.error("Error reading meta:", error);
    throw error;
  }
};

export const createMeta = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/metas/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create meta");
  return await res.json();
};

export const updateMeta = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/metas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update meta");
  return await res.json();
};

export const deleteMeta = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/metas/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete meta");
  return await res.json();
};


// Auto-generated CRUD for module
export const fetchModules = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/modules/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch module");
    return await res.json();
  } catch (error) {
    console.error("Error fetching module:", error);
    return [];
  }
};

export const getModule = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/modules/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read module");
    return await res.json();
  } catch (error) {
    console.error("Error reading module:", error);
    throw error;
  }
};

export const createModule = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/modules/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create module");
  return await res.json();
};

export const updateModule = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/modules/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update module");
  return await res.json();
};

export const deleteModule = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/modules/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete module");
  return await res.json();
};


// Auto-generated CRUD for notice
export const fetchNotices = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/notices/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch notice");
    return await res.json();
  } catch (error) {
    console.error("Error fetching notice:", error);
    return [];
  }
};

export const getNotice = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/notices/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read notice");
    return await res.json();
  } catch (error) {
    console.error("Error reading notice:", error);
    throw error;
  }
};

export const createNotice = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/notices/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create notice");
  return await res.json();
};

export const updateNotice = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/notices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update notice");
  return await res.json();
};

export const deleteNotice = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/notices/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete notice");
  return await res.json();
};


// Auto-generated CRUD for notification
export const fetchNotifications = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/notifications/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch notification");
    return await res.json();
  } catch (error) {
    console.error("Error fetching notification:", error);
    return [];
  }
};

export const getNotification = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/notifications/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read notification");
    return await res.json();
  } catch (error) {
    console.error("Error reading notification:", error);
    throw error;
  }
};

export const createNotification = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/notifications/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create notification");
  return await res.json();
};

export const updateNotification = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/notifications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update notification");
  return await res.json();
};

export const deleteNotification = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/notifications/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete notification");
  return await res.json();
};


// Auto-generated CRUD for operation
export const fetchOperations = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/operations/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch operation");
    return await res.json();
  } catch (error) {
    console.error("Error fetching operation:", error);
    return [];
  }
};

export const getOperation = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/operations/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read operation");
    return await res.json();
  } catch (error) {
    console.error("Error reading operation:", error);
    throw error;
  }
};

export const createOperation = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/operations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create operation");
  return await res.json();
};

export const updateOperation = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/operations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update operation");
  return await res.json();
};

export const deleteOperation = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/operations/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete operation");
  return await res.json();
};


// Auto-generated CRUD for order
export const fetchOrders = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/orders/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch order");
    return await res.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    return [];
  }
};

export const getOrder = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/orders/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read order");
    return await res.json();
  } catch (error) {
    console.error("Error reading order:", error);
    throw error;
  }
};

export const createOrder = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return await res.json();
};

export const updateOrder = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return await res.json();
};

export const deleteOrder = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/orders/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return await res.json();
};


// Auto-generated CRUD for order-item
export const fetchOrderItems = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/order_items/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch order-item");
    return await res.json();
  } catch (error) {
    console.error("Error fetching order-item:", error);
    return [];
  }
};

export const getOrderItem = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/order_items/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read order-item");
    return await res.json();
  } catch (error) {
    console.error("Error reading order-item:", error);
    throw error;
  }
};

export const createOrderItem = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/order_items/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create order-item");
  return await res.json();
};

export const updateOrderItem = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/order_items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update order-item");
  return await res.json();
};

export const deleteOrderItem = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/order_items/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete order-item");
  return await res.json();
};


// Auto-generated CRUD for page
export const fetchPages = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/pages/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch page");
    return await res.json();
  } catch (error) {
    console.error("Error fetching page:", error);
    return [];
  }
};

export const getPage = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/pages/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read page");
    return await res.json();
  } catch (error) {
    console.error("Error reading page:", error);
    throw error;
  }
};

export const createPage = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/pages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create page");
  return await res.json();
};

export const updatePage = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/pages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update page");
  return await res.json();
};

export const deletePage = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/pages/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete page");
  return await res.json();
};


// Auto-generated CRUD for partnership
export const fetchPartnerships = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/partnerships/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch partnership");
    return await res.json();
  } catch (error) {
    console.error("Error fetching partnership:", error);
    return [];
  }
};

export const getPartnership = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/partnerships/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read partnership");
    return await res.json();
  } catch (error) {
    console.error("Error reading partnership:", error);
    throw error;
  }
};

export const createPartnership = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/partnerships/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create partnership");
  return await res.json();
};

export const updatePartnership = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/partnerships/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update partnership");
  return await res.json();
};

export const deletePartnership = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/partnerships/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete partnership");
  return await res.json();
};


// Auto-generated CRUD for payment
export const fetchPayments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/payments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch payment");
    return await res.json();
  } catch (error) {
    console.error("Error fetching payment:", error);
    return [];
  }
};

export const getPayment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/payments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read payment");
    return await res.json();
  } catch (error) {
    console.error("Error reading payment:", error);
    throw error;
  }
};

export const createPayment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/payments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create payment");
  return await res.json();
};

export const updatePayment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update payment");
  return await res.json();
};

export const deletePayment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/payments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete payment");
  return await res.json();
};


// Auto-generated CRUD for popup-offer
export const fetchPopupOffers = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/popup_offers/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch popup-offer");
    return await res.json();
  } catch (error) {
    console.error("Error fetching popup-offer:", error);
    return [];
  }
};

export const getPopupOffer = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/popup_offers/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read popup-offer");
    return await res.json();
  } catch (error) {
    console.error("Error reading popup-offer:", error);
    throw error;
  }
};

export const createPopupOffer = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/popup_offers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create popup-offer");
  return await res.json();
};

export const updatePopupOffer = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/popup_offers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update popup-offer");
  return await res.json();
};

export const deletePopupOffer = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/popup_offers/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete popup-offer");
  return await res.json();
};


// Auto-generated CRUD for product
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/products/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return [];
  }
};

export const getProduct = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/products/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read product");
    return await res.json();
  } catch (error) {
    console.error("Error reading product:", error);
    throw error;
  }
};

export const createProduct = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return await res.json();
};

export const updateProduct = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
};

export const deleteProduct = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/products/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return await res.json();
};


// Auto-generated CRUD for product-category
export const fetchProductCategorys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_categorys/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product-category");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product-category:", error);
    return [];
  }
};

export const getProductCategory = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_categorys/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read product-category");
    return await res.json();
  } catch (error) {
    console.error("Error reading product-category:", error);
    throw error;
  }
};

export const createProductCategory = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_categorys/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create product-category");
  return await res.json();
};

export const updateProductCategory = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_categorys/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update product-category");
  return await res.json();
};

export const deleteProductCategory = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_categorys/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete product-category");
  return await res.json();
};


// Auto-generated CRUD for product-image
export const fetchProductImages = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_images/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product-image");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product-image:", error);
    return [];
  }
};

export const getProductImage = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_images/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read product-image");
    return await res.json();
  } catch (error) {
    console.error("Error reading product-image:", error);
    throw error;
  }
};

export const createProductImage = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_images/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create product-image");
  return await res.json();
};

export const updateProductImage = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_images/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update product-image");
  return await res.json();
};

export const deleteProductImage = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_images/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete product-image");
  return await res.json();
};


// Auto-generated CRUD for product-review
export const fetchProductReviews = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_reviews/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product-review");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product-review:", error);
    return [];
  }
};

export const getProductReview = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_reviews/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read product-review");
    return await res.json();
  } catch (error) {
    console.error("Error reading product-review:", error);
    throw error;
  }
};

export const createProductReview = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create product-review");
  return await res.json();
};

export const updateProductReview = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update product-review");
  return await res.json();
};

export const deleteProductReview = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_reviews/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete product-review");
  return await res.json();
};


// Auto-generated CRUD for product-tag
export const fetchProductTags = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_tags/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product-tag");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product-tag:", error);
    return [];
  }
};

export const getProductTag = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/product_tags/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read product-tag");
    return await res.json();
  } catch (error) {
    console.error("Error reading product-tag:", error);
    throw error;
  }
};

export const createProductTag = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_tags/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create product-tag");
  return await res.json();
};

export const updateProductTag = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_tags/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update product-tag");
  return await res.json();
};

export const deleteProductTag = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/product_tags/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete product-tag");
  return await res.json();
};


// Auto-generated CRUD for question
export const fetchQuestions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/questions/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch question");
    return await res.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    return [];
  }
};

export const getQuestion = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/questions/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read question");
    return await res.json();
  } catch (error) {
    console.error("Error reading question:", error);
    throw error;
  }
};

export const createQuestion = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create question");
  return await res.json();
};

export const updateQuestion = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update question");
  return await res.json();
};

export const deleteQuestion = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/questions/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete question");
  return await res.json();
};


// Auto-generated CRUD for question-category
export const fetchQuestionCategorys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/question_categorys/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch question-category");
    return await res.json();
  } catch (error) {
    console.error("Error fetching question-category:", error);
    return [];
  }
};

export const getQuestionCategory = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/question_categorys/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read question-category");
    return await res.json();
  } catch (error) {
    console.error("Error reading question-category:", error);
    throw error;
  }
};

export const createQuestionCategory = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_categorys/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create question-category");
  return await res.json();
};

export const updateQuestionCategory = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_categorys/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update question-category");
  return await res.json();
};

export const deleteQuestionCategory = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_categorys/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete question-category");
  return await res.json();
};


// Auto-generated CRUD for question-option
export const fetchQuestionOptions = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/question_options/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch question-option");
    return await res.json();
  } catch (error) {
    console.error("Error fetching question-option:", error);
    return [];
  }
};

export const getQuestionOption = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/question_options/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read question-option");
    return await res.json();
  } catch (error) {
    console.error("Error reading question-option:", error);
    throw error;
  }
};

export const createQuestionOption = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_options/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create question-option");
  return await res.json();
};

export const updateQuestionOption = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_options/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update question-option");
  return await res.json();
};

export const deleteQuestionOption = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_options/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete question-option");
  return await res.json();
};


// Auto-generated CRUD for question-type
export const fetchQuestionTypes = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/question_types/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch question-type");
    return await res.json();
  } catch (error) {
    console.error("Error fetching question-type:", error);
    return [];
  }
};

export const getQuestionType = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/question_types/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read question-type");
    return await res.json();
  } catch (error) {
    console.error("Error reading question-type:", error);
    throw error;
  }
};

export const createQuestionType = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_types/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create question-type");
  return await res.json();
};

export const updateQuestionType = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_types/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update question-type");
  return await res.json();
};

export const deleteQuestionType = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/question_types/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete question-type");
  return await res.json();
};


// Auto-generated CRUD for review
export const fetchReviews = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/reviews/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch review");
    return await res.json();
  } catch (error) {
    console.error("Error fetching review:", error);
    return [];
  }
};

export const getReview = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/reviews/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read review");
    return await res.json();
  } catch (error) {
    console.error("Error reading review:", error);
    throw error;
  }
};

export const createReview = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create review");
  return await res.json();
};

export const updateReview = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update review");
  return await res.json();
};

export const deleteReview = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/reviews/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete review");
  return await res.json();
};


// Auto-generated CRUD for skill
export const fetchSkills = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/skills/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch skill");
    return await res.json();
  } catch (error) {
    console.error("Error fetching skill:", error);
    return [];
  }
};

export const getSkill = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/skills/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read skill");
    return await res.json();
  } catch (error) {
    console.error("Error reading skill:", error);
    throw error;
  }
};

export const createSkill = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/skills/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create skill");
  return await res.json();
};

export const updateSkill = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update skill");
  return await res.json();
};

export const deleteSkill = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/skills/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete skill");
  return await res.json();
};


// Auto-generated CRUD for sms-template
export const fetchSmsTemplates = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/sms_templates/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch sms-template");
    return await res.json();
  } catch (error) {
    console.error("Error fetching sms-template:", error);
    return [];
  }
};

export const getSmsTemplate = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/sms_templates/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read sms-template");
    return await res.json();
  } catch (error) {
    console.error("Error reading sms-template:", error);
    throw error;
  }
};

export const createSmsTemplate = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/sms_templates/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create sms-template");
  return await res.json();
};

export const updateSmsTemplate = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/sms_templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update sms-template");
  return await res.json();
};

export const deleteSmsTemplate = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/sms_templates/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete sms-template");
  return await res.json();
};


// Auto-generated CRUD for student
export const fetchStudents = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/students/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch student");
    return await res.json();
  } catch (error) {
    console.error("Error fetching student:", error);
    return [];
  }
};

export const getStudent = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/students/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read student");
    return await res.json();
  } catch (error) {
    console.error("Error reading student:", error);
    throw error;
  }
};

export const createStudent = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/students/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create student");
  return await res.json();
};

export const updateStudent = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update student");
  return await res.json();
};

export const deleteStudent = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/students/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return await res.json();
};


// Auto-generated CRUD for student-answer
export const fetchStudentAnswers = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/student_answers/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch student-answer");
    return await res.json();
  } catch (error) {
    console.error("Error fetching student-answer:", error);
    return [];
  }
};

export const getStudentAnswer = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/student_answers/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read student-answer");
    return await res.json();
  } catch (error) {
    console.error("Error reading student-answer:", error);
    throw error;
  }
};

export const createStudentAnswer = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_answers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create student-answer");
  return await res.json();
};

export const updateStudentAnswer = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_answers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update student-answer");
  return await res.json();
};

export const deleteStudentAnswer = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_answers/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete student-answer");
  return await res.json();
};


// Auto-generated CRUD for student-certificate
export const fetchStudentCertificates = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/student_certificates/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch student-certificate");
    return await res.json();
  } catch (error) {
    console.error("Error fetching student-certificate:", error);
    return [];
  }
};

export const getStudentCertificate = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/student_certificates/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read student-certificate");
    return await res.json();
  } catch (error) {
    console.error("Error reading student-certificate:", error);
    throw error;
  }
};

export const createStudentCertificate = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_certificates/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create student-certificate");
  return await res.json();
};

export const updateStudentCertificate = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_certificates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update student-certificate");
  return await res.json();
};

export const deleteStudentCertificate = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_certificates/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete student-certificate");
  return await res.json();
};


// Auto-generated CRUD for student-lesson-exam-answer
export const fetchStudentLessonExamAnswers = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/student_lesson_exam_answers/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch student-lesson-exam-answer");
    return await res.json();
  } catch (error) {
    console.error("Error fetching student-lesson-exam-answer:", error);
    return [];
  }
};

export const getStudentLessonExamAnswer = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/student_lesson_exam_answers/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read student-lesson-exam-answer");
    return await res.json();
  } catch (error) {
    console.error("Error reading student-lesson-exam-answer:", error);
    throw error;
  }
};

export const createStudentLessonExamAnswer = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_lesson_exam_answers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create student-lesson-exam-answer");
  return await res.json();
};

export const updateStudentLessonExamAnswer = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_lesson_exam_answers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update student-lesson-exam-answer");
  return await res.json();
};

export const deleteStudentLessonExamAnswer = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/student_lesson_exam_answers/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete student-lesson-exam-answer");
  return await res.json();
};


// Auto-generated CRUD for tag
export const fetchTags = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/tags/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch tag");
    return await res.json();
  } catch (error) {
    console.error("Error fetching tag:", error);
    return [];
  }
};

export const getTag = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/tags/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read tag");
    return await res.json();
  } catch (error) {
    console.error("Error reading tag:", error);
    throw error;
  }
};

export const createTag = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/tags/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create tag");
  return await res.json();
};

export const updateTag = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/tags/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update tag");
  return await res.json();
};

export const deleteTag = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/tags/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete tag");
  return await res.json();
};


// Auto-generated CRUD for ticket
export const fetchTickets = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/tickets/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch ticket");
    return await res.json();
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return [];
  }
};

export const getTicket = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/tickets/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read ticket");
    return await res.json();
  } catch (error) {
    console.error("Error reading ticket:", error);
    throw error;
  }
};

export const createTicket = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/tickets/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket");
  return await res.json();
};

export const updateTicket = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/tickets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update ticket");
  return await res.json();
};

export const deleteTicket = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/tickets/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete ticket");
  return await res.json();
};


// Auto-generated CRUD for ticket-department
export const fetchTicketDepartments = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_departments/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch ticket-department");
    return await res.json();
  } catch (error) {
    console.error("Error fetching ticket-department:", error);
    return [];
  }
};

export const getTicketDepartment = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_departments/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read ticket-department");
    return await res.json();
  } catch (error) {
    console.error("Error reading ticket-department:", error);
    throw error;
  }
};

export const createTicketDepartment = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_departments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket-department");
  return await res.json();
};

export const updateTicketDepartment = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_departments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update ticket-department");
  return await res.json();
};

export const deleteTicketDepartment = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_departments/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete ticket-department");
  return await res.json();
};


// Auto-generated CRUD for ticket-message
export const fetchTicketMessages = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_messages/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch ticket-message");
    return await res.json();
  } catch (error) {
    console.error("Error fetching ticket-message:", error);
    return [];
  }
};

export const getTicketMessage = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_messages/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read ticket-message");
    return await res.json();
  } catch (error) {
    console.error("Error reading ticket-message:", error);
    throw error;
  }
};

export const createTicketMessage = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_messages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket-message");
  return await res.json();
};

export const updateTicketMessage = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_messages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update ticket-message");
  return await res.json();
};

export const deleteTicketMessage = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_messages/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete ticket-message");
  return await res.json();
};


// Auto-generated CRUD for ticket-priority
export const fetchTicketPrioritys = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_prioritys/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch ticket-priority");
    return await res.json();
  } catch (error) {
    console.error("Error fetching ticket-priority:", error);
    return [];
  }
};

export const getTicketPriority = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_prioritys/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read ticket-priority");
    return await res.json();
  } catch (error) {
    console.error("Error reading ticket-priority:", error);
    throw error;
  }
};

export const createTicketPriority = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_prioritys/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket-priority");
  return await res.json();
};

export const updateTicketPriority = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_prioritys/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update ticket-priority");
  return await res.json();
};

export const deleteTicketPriority = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_prioritys/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete ticket-priority");
  return await res.json();
};


// Auto-generated CRUD for ticket-related-service
export const fetchTicketRelatedServices = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_related_services/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch ticket-related-service");
    return await res.json();
  } catch (error) {
    console.error("Error fetching ticket-related-service:", error);
    return [];
  }
};

export const getTicketRelatedService = async (id: string | number) => {
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/ticket_related_services/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to read ticket-related-service");
    return await res.json();
  } catch (error) {
    console.error("Error reading ticket-related-service:", error);
    throw error;
  }
};

export const createTicketRelatedService = async (payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_related_services/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket-related-service");
  return await res.json();
};

export const updateTicketRelatedService = async (id: string | number, payload: any) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_related_services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update ticket-related-service");
  return await res.json();
};

export const deleteTicketRelatedService = async (id: string | number) => {
  const res = await fetch(`${apiBaseUrl}/api/v1/ticket_related_services/$ {id}`.replace(" $ ", ""), {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to delete ticket-related-service");
  return await res.json();
};

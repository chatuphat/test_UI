 class="text-base<template>
  <div class="overflow-x-auto">
    <div>
      <input
        class="input input-bordered input-success w-full max-w-xs mr-4"
        type="text"
        v-model="searchText"
        placeholder="ค้นชื่อเเพทย์"
      />
      <button class="btn btn-success mb-4" @click="search">ค้นหา</button>
    </div>

    <table class="table w-full">
      <thead>
        <tr>
          <th class="text-base"></th>
          <th class="text-base">ID</th>
          <th class="text-base">ชื่อเเพทย์เเละนามสกุล</th>
          <th class="text-base" >ชื่อ</th>
          <th class="text-base" >นามสกุล</th>
          <th class="text-base" >รหัส</th>
          <th class="text-base" >วันที่สร้าง</th>
          <th class="text-base" >วันที่เเก้ไข</th>
          <th class="text-base">เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctorprofile, index) in doctorprofiles">
          <th>{{ index + 1 }}</th>
          <td>{{ doctorprofile._id }}</td>
          <td>{{ doctorprofile.fullNameTH }}</td>
          <td>{{ doctorprofile.firstNameTH }}</td>
          <td>{{ doctorprofile.lastNameTH }}</td>
          <td>{{ doctorprofile.codeDoctor }}</td>
          <td>
            {{ moment(doctorprofile.createdAt).format("YYYY-MM-DD HH:mm") }}
          </td>
          <td>
          {{
            moment(doctorprofile.updatedAt).format("YYYY-MM-DD HH:mm")
          }}
          </td>
          <td>
            <router-link :to="`/edit_user/${doctorprofile._id}`">
              <button class="btn btn-warning btn-sm mr-2">เเก้ไข</button>
            </router-link>

            <button
              class="btn btn-error btn-sm mr-2"
              @click="delete_users(doctorprofile._id)"
            >
              ลบ
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import moment from "moment";

const doctorprofiles = ref({});
const searchText = ref("");

const fetch_users = async () => {
  await axios
    .get(`${import.meta.env.VITE_API}/api/v1/doctorprofile`)
    .then((response) => {
      doctorprofiles.value = response.data.doctorprofileData;
    })
    .catch((err) => {
      console.log(err);
    });
};

const search = () => {
  const searchTerm = searchText.value.trim().toLowerCase();
  if (searchTerm === "") {
    fetch_users();
    return;
  }

  const filteredProfiles = Object.values(doctorprofiles.value).filter(
    (profile) => {
      const fullNameTH = profile.fullNameTH.toLowerCase();
      return fullNameTH.includes(searchTerm);
    }
  );

  doctorprofiles.value = filteredProfiles;
};

const delete_users = async (id) => {
  await axios
    .delete(`${import.meta.env.VITE_API}/api/v1/doctorprofile/${id}`)
    .then((response) => {
      console.log(response);
      fetch_users();
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => fetch_users());
</script>
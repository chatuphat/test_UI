<template>
  <div class="overflow-x-auto">
    <div>
      <input
        class="input input-bordered input-success w-full max-w-xs mr-4"
        type="text"
        v-model="searchText"
        placeholder="ค้นหาชื่อเเพทย์"
      />
      <button class="btn btn-success mb-4" @click="search">Search</button>
    </div>


   


    <table class="table w-full">
      <thead>
        <tr>
          <th></th>
          <th class="text-base">ID</th>
          <th class="text-base">ชื่อเเพทย์เเละนามสกุลเเพทย์</th>
          <th class="text-base">วันที่ slot</th>
          <th class="text-base">เวลาเริ่ม slot</th>
          <th class="text-base">เวลาสิ้นสุด slot</th>
          <th class="text-base">เเผนก</th>
          <th class="text-base">ห้อง</th>
          <th class="text-base">วันที่สร้าง</th>
          <th class="text-base">วันที่เเก้ไข</th>
          <th class="text-base">เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctorslot, index) in doctorslots">
          <th>{{ index + 1 }}</th>
          <td>{{ doctorslot._id }}</td>
          <td>{{ doctorslot.doctorFullName }}</td>
          <td>{{ moment(doctorslot.slotDate).format("YYYY-MM-DD") }}</td>
          <td>
            {{
              moment(doctorslot.slotStartDateTime).format("YYYY-MM-DD HH:mm")
            }}
          </td>
          <td>
            {{ moment(doctorslot.slotEndDateTime).format("YYYY-MM-DD HH:mm") }}
          </td>
          <td>{{ doctorslot.departments }}</td>
          <td>{{ doctorslot.room }}</td>
          <td>
            {{ moment(doctorslot.createdAt).format("YYYY-MM-DD HH:mm") }}
          </td>
          <td>{{ moment(doctorslot.updatedAt).format("YYYY-MM-DD HH:mm") }}</td>

          <td>
            <router-link :to="`/edit_user/${doctorslot._id}`">
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

const doctorslots = ref({});
const searchText = ref("");

const fetch_users = async () => {
  await axios
    .get(`${import.meta.env.VITE_API}/api/v1/doctorslot`)
    .then((response) => {
      doctorslots.value = response.data.doctorslotDate;
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

  const filteredProfiles = Object.values(doctorslots.value).filter(
    (profile) => {
      const doctorFullName = profile.doctorFullName.toLowerCase();
      return doctorFullName.includes(searchTerm);
    }
  );

  doctorslots.value = filteredProfiles;
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
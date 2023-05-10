<template>
  <h1 class="text-xl font-bold mb-2">เเก้ไขข้อมูลเเพทย์</h1>
  <div class="form-control">
    <label class="input-group mb-2">
      <span>ชื่อเต็มแพทย์</span>
      <input
        type="text"
        placeholder="กรุณาใส่ชื่อเต็มแพทย์"
        class="input input-bordered"
        v-model="user.fullNameTH"
      />
    </label>

    <label class="input-group mb-2">
      <span>ชื่อเเพทย์</span>
      <input
        type="text"
        placeholder="กรุณาใส่ชื่อเต็ม"
        class="input input-bordered"
        v-model="user.firstNameTH"
      />
    </label>
    <label class="input-group mb-2">
      <span>นามสกุล</span>
      <input
        type="text"
        placeholder="กรุณาใส่นามสกุลแพทย์"
        class="input input-bordered"
        v-model="user.lastNameTH"
      />
    </label>
    <label class="input-group mb-2">
      <span>codeเเพทย์</span>
      <input
        type="text"
        placeholder="กรุณาใส่ code เเพทย์"
        class="input input-bordered"
        v-model="user.codeDoctor"
      />
    </label>

    <button
      class="bg-sky-500 text-base-100 w-24 h-10 rounded-md hover:bg-sky-600"
      @click="edit_user"
    >
      เเก้ไขข้อมูล
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();
console.log(route.params.id);

const user = ref({
  fullNameTH: "",
  firstNameTH: "",
  lastNameTH: "",
  codeDoctor: "",
});

const fetch_single_user = async () => {
  await axios
    .get(`${import.meta.env.VITE_API}/api/v1/doctorprofile/${route.params.id}`)
    .then((response) => {
      console.log(response.data.existingDoctorprofile.fullNameTH);
      user.value.fullNameTH = response.data.existingDoctorprofile.fullNameTH;
      user.value.firstNameTH = response.data.existingDoctorprofile.firstNameTH;
      user.value.lastNameTH = response.data.existingDoctorprofile.lastNameTH;
      user.value.codeDoctor = response.data.existingDoctorprofile.codeDoctor;
    })
    .catch((err) => {
      console.log(err);
    });
};

const edit_user = async () => {
  await axios
    .put(
      `${import.meta.env.VITE_API}/api/v1/doctorprofile/${route.params.id}`,
      {
        fullNameTH: user.value.fullNameTH,
        firstNameTH: user.value.firstNameTH,
        lastNameTH: user.value.lastNameTH,
        codeDoctor: user.value.codeDoctor,
      }
    )
    .then((response) => {
      user.value.fullNameTH = response.data.existingDoctorprofile.fullNameTH;
      alert("บันทึกข้อมูลสําเร็จ");
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => fetch_single_user());
</script>
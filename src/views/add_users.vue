<template>
  <h1 class="text-xl font-bold mb-2">เพิ่มชื่อแพทย์</h1>
  <div class="form-control">
    <label class="input-group mb-2">
      <span>ชื่อเต็มแพทย์</span>
      <input
        type="text"
        placeholder="กรุณาใส่ชื่อเต็มแพทย์"
        class="input input-bordered"
        v-model="add.fullNameTH"
      />
    </label>

    <label class="input-group mb-2">
      <span>ชื่อเเพทย์</span>
      <input
        type="text"
        placeholder="กรุณาใส่ชื่อเต็ม"
        class="input input-bordered"
        v-model="add.firstNameTH"
      />
    </label>
    <label class="input-group mb-2">
      <span>นามสกุล</span>
      <input
        type="text"
        placeholder="กรุณาใส่นามสกุลแพทย์"
        class="input input-bordered"
        v-model="add.lastNameTH"
      />
    </label>
    <label class="input-group mb-2">
      <span>codeเเพทย์</span>
      <input
        type="text"
        placeholder="กรุณาใส่ code เเพทย์"
        class="input input-bordered"
        v-model="add.codeDoctor"
      />
    </label>

    <button
      class="bg-sky-500 text-base-100 w-24 h-10 rounded-md hover:bg-sky-600"
      @click="checkUser"
    >
      เพิ่มข้อมูล
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import router from "../router";

export default {
  setup() {
    const add = ref({
      fullNameTH: "",
      firstNameTH: "",
      lastNameTH: "",
      codeDoctor: "",
    });

    const insertUser = () => {
      axios
        .post(`${import.meta.env.VITE_API}/api/v1/doctorprofile`, add.value)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    const checkUser = async () => {
      await insertUser();
      await alert("เพิ่มข้อมูลสัาเร็จ");
      await router.push("/");
    };

    return {
      add,
      insertUser,
      checkUser,
    };
  },
};
</script>
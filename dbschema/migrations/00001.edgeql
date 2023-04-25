CREATE MIGRATION m1vg7qcxcksjjvnikq266nv7uspkf3jxtuxg3s6midl4lk7nnlfxwa
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY name -> std::str;
  };
};

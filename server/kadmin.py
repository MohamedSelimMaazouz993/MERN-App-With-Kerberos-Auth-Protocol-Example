import kadmin

kadm = kadmin.init_with_keytab("user/admin@MSM.COM", "/path/to/keytab")
kadm = kadmin.init_with_ccache("user/admin@MSM.COM", "/path/to/krb5cc")
kadm = kadmin.init_with_password("user/admin@MSM.COM", "aStrongPassword")

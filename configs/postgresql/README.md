# 从 Docker 获取 postgresql 默认配置
```bash
docker run -i --rm postgres cat /usr/share/postgresql/postgresql.conf.sample > my-postgres.conf
```

# Docker 运行 postgresql
## Windows
使用下列命令启动 postgresql，设置密码和时区，持久化，使用自定义配置。
```powershell
docker run -d --name default-postgres -p 5432:5432 -e 'POSTGRES_PASSWORD=your-password' -e TZ='Asia/Shanghai' -v 'D:\Apps\Docker\volumes\postgresql\data:/var/lib/postgresql/data' -v 'D:\Develop\docker\postgresql\my-postgres.conf:/etc/postgresql/postgresql.conf' postgres -c 'config_file=/etc/postgresql/postgresql.conf'
```
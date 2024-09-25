import datetime


def main():
    with open('hosts', 'w', encoding='utf8') as hosts_file:
        hosts_file.write(
            f"# 此文件来源于：https://github.com/BlazeSnow/OneDriveHosts\n")
        hosts_file.write(
            f"# 仓库镜像：https://gitee.com/blazesnow/OneDriveHosts\n")
        current_time = datetime.datetime.now()
        hosts_file.write(
            f"# 更新时间：" + str(current_time) + "\n\n")


if __name__ == '__main__':
    main()

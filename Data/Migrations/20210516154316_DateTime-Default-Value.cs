using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class DateTimeDefaultValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTime",
                table: "Orders",
                type: "datetime2",
                nullable: true,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTime",
                table: "Deliveries",
                type: "datetime2",
                nullable: true,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "35d95544-6a5f-4d9f-a9d1-b6ff82ca35b9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "f2bc4edf-0999-44d7-bba5-576f3fb217f0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "8afa043a-aa72-46e3-831b-214b5f0113f0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "2d8ff7fc-3b62-47f8-aa9b-c7bb6c05b00a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7d52358b-e48b-4a8e-aa40-5420c7219e92", "AQAAAAEAACcQAAAAEGH1mslsc8+4sYtTzW/pBi2XKZaxJaL/GeCeHKbytf/3nyu2NbszDhBsPWLDDEgR8A==", "90152d9a-e5f0-46ad-b467-8ef4030445fd" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTime",
                table: "Deliveries",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValueSql: "GETDATE()");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "a593d866-252e-4f97-b6dc-33afb62f2859");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "51d81e4b-a493-413d-b412-9f9403ae8c05");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "1514bfc9-6365-43ae-a367-7aa058399d87");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "f4c70660-7fd0-4903-b4f7-5d8b7c772209");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "03843f66-1490-4a90-ba2f-642ddca294f7", "AQAAAAEAACcQAAAAEJUEdR1ElP/vMLdlqITE7Chs1xZXMYL4llUvu2n1iZGFi9F3hr5rZ1vuD2N15m0t1w==", "991ba462-32a3-4e13-9802-9ab9ae2d9dcd" });
        }
    }
}

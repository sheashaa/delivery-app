using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class NullableOrderDeliveryId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Deliveries_DeliveryId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Deliveries_DeliveryId",
                table: "Orders",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Deliveries_DeliveryId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "eac741d6-7ffd-43eb-8e39-6b0f82647fb1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "0fea127f-4e37-4072-88d5-dac5f6c83e76");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "928be12a-6848-4a17-8b27-42ec18d6a8c7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "4c6d5f1a-779d-473a-8e16-0ef273808422");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "90f84444-7a07-4e88-80df-dce58e591214", "AQAAAAEAACcQAAAAEJarlNYQ1gdCTqARYJ+aLz2A60Fn4YML20vjVwnKFUPVaUkk076Uc7DdtXU1NkyeYw==", "89d3c2e4-4700-43ad-b1b9-31dfa3b5ece3" });

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Deliveries_DeliveryId",
                table: "Orders",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

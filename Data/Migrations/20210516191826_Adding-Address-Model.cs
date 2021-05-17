using Microsoft.EntityFrameworkCore.Migrations;

namespace DeliveryApp.Data.Migrations
{
    public partial class AddingAddressModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StreetName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Building = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Floor = table.Column<int>(type: "int", nullable: true),
                    Apartment = table.Column<int>(type: "int", nullable: true),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0A3A9831-8DBA-4F86-996A-FD3A40CC0030",
                column: "ConcurrencyStamp",
                value: "fc46bed9-e882-4e2e-8030-bf4e189b43ab");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3E0A855D-6FCB-4C23-850E-C13B567621A5",
                column: "ConcurrencyStamp",
                value: "b808b208-9154-4d68-b1be-023aa568ea25");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4973D731-E8B6-4982-8D96-0E4A0368E581",
                column: "ConcurrencyStamp",
                value: "b7d44e9d-a40d-4861-9ff6-7302cc0e9087");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "555EA1A2-7BEF-4018-82D8-7679F5D17D1C",
                column: "ConcurrencyStamp",
                value: "bb5215c2-3dc2-439a-b064-64b201f9c267");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "F6C7E8B8-A875-41C2-B441-AB933F29ABD2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3b3ef22f-881f-4cd4-884f-33eccc6368ff", "AQAAAAEAACcQAAAAEBN3tWWy8B6kb472pdTJvuCvZBIr+ngn+TPgJ882XBE4q4zDWOvwcekfY3sx/xZ3bg==", "54af99b8-05b8-45de-a830-64a2362ac805" });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AddressId",
                table: "Orders",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_ApplicationUserId",
                table: "Addresses",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Addresses_AddressId",
                table: "Orders",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Addresses_AddressId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AddressId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

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
    }
}

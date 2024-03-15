# Business Objectives


## Hướng dẫn khách hàng để có trải nghiệm mua vé nhanh và hiệu quả:
- 1: Truy cập vào website
- 2: Chọn thông tin hành trình
- 3: Chọn ghế, điểm đón, trả khách, nhập thông tin khách hàng
- 4: Chọn phương thức thanh toán
- 5: Mua vé thành công


# Trip Information:
## Loại vé:
- Vé 1 chiều
- Vé khứ hồi

## Quy trình mua vé:
- Bước 1: Điểm đến, điểm đi
    - Tìm kiếm gần vị trí của khách hàng nếu có bến xe gần đó
- Bước 2: Ngày đi, số người đi(số lượng vé)
    - Nếu là vé khứ hồi thì cho phép chọn ngày về

- Bước 3:
    - Chọn giờ đi
    - Loại ghế(ngồi, giường nằm, limosine, giường đôi)
    - Chọn vị trí đón khách(các chi nhánh của công ty, cho phép khách hàng nhập vị trí của mình, đưa ra các option gần với vị trí của khách).
    - Chọn chuyển (ghế trống, có thời gian đi sớm nhất)
    - Chọn số ghế

- Bước 4: Chọn phương thức thanh toán(nạp tiền vào ứng dụng để thanh toán, ZaloPay, Momo, VNPay, AirPay, ApplePay, SamsungPay,...)

- Bước 5: Xác nhận thanh toán thàng công -> mua vé thành công -> hoá đơn điện tử cùng vé xe sẽ được gửi về địa chỉ mail

# Database:

**Users**
|    ID  |  first_name  |  last_name  |  city     |        email        |   Phone      |        password         |  isActive  |
| ------ | ------------ | ------------| --------- |---------------------|--------------|-------------------------|------------|
|  01    |   Nguyen     |  Huynh Man  | TP.HCM    | nhman2002@gmail.com | [0123456789] | string(hashed password) |  active    |
|  02    |     John     |     Doe     | Hai Phong | something@gmail.com | [0234342512] | string(hashed password) |  disable   |
|........|..............|.............|...........|.....................|..............|.........................|............|


**Tickets**
|    ID  |  User_Id     |     Type    |  ticket_context |    paid   |    price   |
| ------ | ------------ | ------------| --------------- | -------- |----------- |
|   10   |     01       |     1_way   |     Object      |  cancel  |  200.000đ  |
|   20   |     02       | round-trip  |     Object      | fulfilled|  100.000đ  |
|   30   |     03       | round-trip  |     Object      |  pending |  100.000đ. |
|........|..............|.............|.................|..........|............|

**Ticket_context**
- `If ticket is 1-way -> returnDate can be null`

|      departure    |   destination  |     departmentDate    |  returnDate | trip |
| ----------------- | -------------- | ----------------------| ----------- |------|
|        11111      |      19292     |      01/01/2024       |     null    |  101 |
|        22222      |      30040     |      02/01/2024       |  02/02/2024 |  202 |
|...................|................|.......................|.............|......|

**Trip**
|    ID   |     license    |  seatNum  | driver |  staff  |
| ------- | -------------- | ----------|--------|---------|
|   101   |  51-F1-12345   |     45    | 99999  | [55555] |
|   202   |  51-F2-54321   |     16    | 44444  | [22222] |
|.........|................|...........|........|.........|

**Branch**
|    ID   |        address       |   city    |  district  |  ward  |
| ------- | -------------------- | ----------|------------|--------|
|   11111 |  227 Dien Bien Phu   |   TP.HCM  | Binh Thanh |   16   |
|   22222 | 123 Nguyen Van Troi  |   TP.HCM  |      1     |    5   |
|.........|......................|...........|............|........|


**Employeee**
|    ID   | first_name  |  last_name   |  address  |   tax  |   type   |
| ------- | ----------- | -------------|-----------|--------|----------|
| 11111   |    Nguyen   |     Van A    |227 NVC,...| 111111 | vallet   |
| 44444   |    Nguyen   |     Van B    |123 MDC,...| 222222 | driver   |
| 55555   |     Vu      |     Tran     |911 HTQ,...| 333333 | staff    |
|.........|.............|..............|...........|........|..........|


# Database Constraint

- `Users`
    - ID is unique, not null
    - First_name, Last_name, City, Email, phone, password, isActive is not null
    - phone is an array, we dont know whether the user have multiple phone number

- `Tickets`
    - ID is unique, not null
    - User_Id, type, ticket_context, paid, price is not null
    - ticket_context:
        - departure, destination, departmentDate, trip is not null

- `Trip`
    - ID is unique, not null
    - license, seatNum, driver, staff is not null
    - staff is an array, we dont know whether the bus trip have multiple staff

- `Branch`
    - ID is unique, not null
    - address, city, district, ward is not null

- `Employeee`
    - ID is unique, not null
    - first_name, last_name, address is not null


# Functionality:

- `Users`:
    - Create new `User`
    - Update `Users`:
        - Update phone(array) (change phone number, concat phone number)
        - Update email(string), password(string), isActive (active, disable)

- `Tickets`:
    - Create new `Ticket`
    - Update `Ticket`  paid(fulfilled, pending, cancel), price(string)
    - Update `Ticket` type(1-way, round-trip) -> Update ticket_context on returnDate(string)
    - Update `ticket_context`:
        - Udpate `ticket_context` on departmentDate(string), returnDate(string), trip(string)

- `Trip`:
    - Create new `Trip`
    - Remove `Trip`
    - Update `Trip` on driver(number) and staff(array)

- `Branch`:
    - Create new `Branch`
    - Remove `Branch`

- `Employee`:
    - Create new `Employee`
    - Remove `Employee`
    - Update `Employee` on tax(string), type(string) and address(string)


# Transaction Frequency

Below are the list of functionalities (transactions) that the system will provide. The list is divided into 2 parts: Users and Ticket. Each part will have a list of transactions that the user can perform, with their appropriate estimated frequency.


## `Users`
| Order | Functionality         |    Frequency   |
| ----- | --------------------- | -------------- |
| USR1  | Login                 | ~300.000/day   |
| USR2  | Create new users      | ~100/day       |
| USR3  | Update Users infos    | ~200/day       |
| USR4  | Remove Users          | ~100/year      |
| USR5  | Retrieve Users infos  | ~100.000/day   |


## `Tickets`
| Order | Functionality         |    Frequency   |
| ----- | --------------------- | -------------- |
| TIK1  | Create new Ticket     | ~300.000/day   |
| TIK2  | Update ticket type    | ~1.000/day     |
| TIK3  | Update ticket price   | ~1.000/day     |
| TIK4  | Update ticket paid    | ~1.500/day     |
| TIK5  | Update ticket_context | ~1.000/day     |
| TIK6  | Retrieve ticket infos | ~100.000/day   |
| TIK7  | Remove ticket         | ~10.000/month  |



## `Trip`
| Order | Functionality         |    Frequency   |
| ----- | --------------------- | -------------- |
| TRP1  | Create new Trip       | ~20/year       |
| TRP2  | Update Trip's Driver  | ~20/year       |
| TRP3  | Update Trip's Staff   | ~100/month     |
| TRP4  | Retrieve Trip's infos | ~1.000/day     |
| TRP5  | Remove Trip           | ~50/year       |

## `Branch`
| Order | Functionality         |    Frequency   |
| ----- | --------------------- | -------------- |
| BRH1  | Create new Branch     | ~10/year       |
| BRH2  | Retrieve Branch infos | ~1.000/day       |
| BRH3  | Remove Branch         | ~10/year       |

## `Employee`
| Order | Functionality            |    Frequency   |
| ----- | ------------------------ | -------------- |
| EMP1  | Create new Employee      | ~50/month      |
| EMP2  | Update Employee address  | ~100/month     |
| EMP3  | Update Employee tax      | ~100/month     |
| EMP4  | Update Employee type     | ~10/month     |
| EMP5  | Retrieve Employee infos  | ~200/day       |
| EMP6  | Remove Employee          | ~20/year       |



# Detailed Assessment 

Since the system is a bus station management system, transactions related to `users` and `ticket` are the most frequent and important transactions. We estimated some frequency information of the database based on the information given in the requirements overview document, and have decided to use the following assumptions:

 The database will be used by a large bus station, with around **500-10.000** clients accesssing the page per day.
- The bus station access will be open throughout the day(24/7)
- On average, there will be around **200-1000** ticket requests per day.
- The bus station will have around **500-1.000** staff (including drivers and vallet), **100-1.000** regular staffs.
- An trip will take around **3-16** hours.
- With the above assumptions, we estimated that there will be on average **32-90** clients per trip per day.


# Data Volume Assessment

We have estimated that the following collections:

- Users
- Tickets

will hold the most data, which are also the most important collections of the system as they are related to the most frequent transactions of the database. In more details, we have estimated the following data volume for each of these collection:

| Table                | No of records (to date) | No of records/day | No of records/month |
| -------------------- | ----------------------- | ----------------- | ------------------- |
| Users                | ~1.000.000              | 500-1.000         | 10.000-20.000       |
| Tickets              | ~5.000.000              | 200-1.000         | 4.000-20.000        |



# Data Usage Assessment
Below are the "considered-essential" transactions of the database, which account for **500-1.000%** of the total transactions:

- something
- something
- something
- something
- something

### Cross-Reference matrix
| Transaction/Collections  |      |     |     |     |      |     |     |     |      |     |     |     |
| ------------------------ | ---- | --- | --- | --- | ---- | --- | --- | --- | ---- | --- | --- | --- |
|                          | I    | U   | D   | R   | I    | U   | D   | R   | I    | U   | D   | R   |
| Users                    |      |     |     |     |      |     |     |     |      |     |     |     |
| Tickets                  |      |     |     |     |      |     |     |     |      |     |     |     |
| Trip                     |      |     |     |     |      |     |     |     |      |     |     |     |
| Branch                   |      |     |     |     |      |     |     |     |      |     |     |     |
| Employee                  |      |     |     |     |      |     |     |     |      |     |     |     |

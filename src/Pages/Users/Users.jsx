import React from "react";
import { useTable } from "../../Templates/useTable";

const rows = [
  { id: 1, name: 'Jodi', email: 'natashadawson@thomas-riley.org', city: 'New Jacobtown',created_at: '2024-10-09', phone: '2134443518'  },
  { id: 2, name: 'Lisa', email: 'xpaul@phillips.com', city: 'Reynoldsmouth', phone: '332-056-3646', created_at: '2024-03-26' },
  { id: 3, name: 'Jonathon', email: 'tscott@gmail.com', city: 'South Jacquelinestad', phone: '417-116-8317', created_at: '2024-03-20' },
  { id: 4, name: 'Jenna', email: 'carterbrad@gmail.com', city: 'West Travis', phone: '002-769-5270x1602', created_at: '2024-09-02' },
  { id: 5, name: 'Paul', email: 'floresdeanna@hotmail.com', city: 'Louisburgh', phone: '(505)773-2151', created_at: '2024-08-10' },
  { id: 6, name: 'Alex', email: 'johnson_lindsay@yahoo.com', city: 'Robertsberg', phone: '(682)436-4792x55629', created_at: '2024-04-01' },
  { id: 7, name: 'Sarah', email: 'melissabanks@gmail.com', city: 'Amandaport', phone: '1-576-532-7038x657', created_at: '2024-02-25' },
  { id: 8, name: 'Michael', email: 'joneseduardo@hotmail.com', city: 'Lake Jessicamouth', phone: '1-280-430-9316', created_at: '2024-06-16' },
  { id: 9, name: 'Sophia', email: 'brycesaunders@contreras.biz', city: 'Edwardsside', phone: '687.830.5060', created_at: '2024-08-21' },
  { id: 10, name: 'David', email: 'stevenmoore@gmail.com', city: 'Mcgrathport', phone: '(853)289-3194', created_at: '2024-04-15' },
  { id: 11, name: 'Mia', email: 'wilcoxkelsey@hotmail.com', city: 'Lake Katieshire', phone: '1-438-387-3204x5328', created_at: '2024-09-08' },
  { id: 12, name: 'Chris', email: 'cynthiamiller@yahoo.com', city: 'South Andrea', phone: '1-680-951-6055x228', created_at: '2024-10-05' },
  { id: 13, name: 'Jack', email: 'courtneymartin@castillo-woodward.com', city: 'South Heidi', phone: '(642)254-8239', created_at: '2024-07-30' },
  { id: 14, name: 'Emma', email: 'wallacecharles@gmail.com', city: 'Lauriebury', phone: '(458)240-9992', created_at: '2024-08-19' },
  { id: 15, name: 'Lucas', email: 'rhodeskathryn@gmail.com', city: 'Lauraport', phone: '(242)450-4987', created_at: '2024-04-28' },
  { id: 16, name: 'Olivia', email: 'samanthapowell@martinez.com', city: 'Matthewview', phone: '713.826.4704x889', created_at: '2024-08-14' },
  { id: 17, name: 'Liam', email: 'ryanmendoza@gmail.com', city: 'East Theresa', phone: '(450)713-4104', created_at: '2024-03-21' },
  { id: 18, name: 'Ella', email: 'douglasdiaz@osborne-flores.com', city: 'Brooksview', phone: '216-172-6426', created_at: '2024-05-22' },
  { id: 19, name: 'Ethan', email: 'haleyreed@nelson.net', city: 'North Alexandramouth', phone: '802-775-2265x274', created_at: '2024-09-15' },
  { id: 20, name: 'Charlotte', email: 'mjohnson@aguilar.net', city: 'Loriberg', phone: '983-703-4402', created_at: '2024-07-03' },
  { id: 21, name: 'James', email: 'hodgestamara@prince.biz', city: 'West Elizabethmouth', phone: '491-218-6017x36777', created_at: '2024-06-04' },
  { id: 22, name: 'Isabella', email: 'nicholasstone@lawrence.org', city: 'North Edward', phone: '(908)592-1204', created_at: '2024-09-09' },
  { id: 23, name: 'Benjamin', email: 'andrewstone@knight-smith.org', city: 'West John', phone: '(365)507-2031', created_at: '2024-10-10' },
  { id: 24, name: 'Mason', email: 'brownesther@yahoo.com', city: 'Lake Luisamouth', phone: '(435)848-2331x618', created_at: '2024-01-08' },
  { id: 25, name: 'Ava', email: 'tamaramann@yahoo.com', city: 'Moralesport', phone: '(671)549-1996', created_at: '2024-05-14' },
  { id: 26, name: 'Harper', email: 'herringnicholas@small-dixon.org', city: 'New Jean', phone: '734-474-1084x3024', created_at: '2024-07-01' },
  { id: 27, name: 'Aiden', email: 'laurenolson@carter.org', city: 'East Emilyborough', phone: '(871)563-3091', created_at: '2024-09-28' },
  { id: 28, name: 'Aria', email: 'jessica56@logan.org', city: 'Brownland', phone: '(540)555-2683', created_at: '2024-03-18' },
  { id: 29, name: 'Henry', email: 'christopherjackson@love.info', city: 'Lake Anthony', phone: '820-186-4001', created_at: '2024-06-17' },
  { id: 30, name: 'Scarlett', email: 'rgrimes@joseph-hughes.biz', city: 'North Megan', phone: '632.517.5826', created_at: '2024-01-26' },
  { id: 31, name: 'Sebastian', email: 'jason28@maxwell.org', city: 'South Michael', phone: '(937)787-2749', created_at: '2024-05-26' },
  { id: 32, name: 'Chloe', email: 'travis69@blake-gonzalez.net', city: 'Adrianville', phone: '315-967-3478', created_at: '2024-07-25' },
  { id: 33, name: 'Samuel', email: 'damionperez@hotmail.com', city: 'Port Kellybury', phone: '(840)444-9989x178', created_at: '2024-09-18' },
  { id: 34, name: 'Levi', email: 'daniel44@aguilar-kim.net', city: 'Rodriguezburgh', phone: '1-301-293-2313', created_at: '2024-06-07' },
  { id: 35, name: 'Ella', email: 'xscott@gmail.com', city: 'West Diane', phone: '236-563-9118', created_at: '2024-04-09' },
  { id: 36, name: 'Dylan', email: 'jason79@mitchell.info', city: 'North Joshuashire', phone: '758.205.8189x185', created_at: '2024-05-03' },
  { id: 37, name: 'Nathan', email: 'williamshaw@yahoo.com', city: 'Brooksview', phone: '264-339-8662x4890', created_at: '2024-08-15' },
  { id: 38, name: 'Oliver', email: 'jordanwilliams@lyons.com', city: 'South Jacobfort', phone: '(860)972-2264', created_at: '2024-07-22' },
  { id: 39, name: 'Isla', email: 'taylor56@hotmail.com', city: 'New Michael', phone: '(869)337-4471x77883', created_at: '2024-02-05' },
  { id: 40, name: 'Zoe', email: 'christopherthomas@hotmail.com', city: 'Hernandezhaven', phone: '390.523.8039', created_at: '2024-03-14' },
  { id: 41, name: 'Gabriel', email: 'brady92@carroll-david.com', city: 'Lake Katiestad', phone: '919-451-3691', created_at: '2024-02-19' },
  { id: 42, name: 'Layla', email: 'kevinwilliams@harvey-morris.info', city: 'West Steven', phone: '(598)766-7819', created_at: '2024-06-29' },
  { id: 43, name: 'Eleanor', email: 'jacob94@phillips.net', city: 'Robertsonside', phone: '339.857.0879x292', created_at: '2024-01-29' },
  { id: 44, name: 'Ryan', email: 'nicolekirk@hicks.info', city: 'Port Randall', phone: '201-478-9711x2141', created_at: '2024-03-29' },
  { id: 45, name: 'Lily', email: 'aricesmith@martin-watson.com', city: 'Port Abigailtown', phone: '532-956-6284', created_at: '2024-02-10' },
  { id: 46, name: 'Isaac', email: 'alexander45@gmail.com', city: 'Martinezport', phone: '987.451.9146', created_at: '2024-07-07' },
  { id: 47, name: 'Grace', email: 'gonzalezandrew@hotmail.com', city: 'West Cheryl', phone: '757-244-2633', created_at: '2024-03-11' },
  { id: 48, name: 'Matthew', email: 'allisonrivera@phillips-brown.biz', city: 'Lewisport', phone: '1-869-621-4228', created_at: '2024-06-10' },
  { id: 49, name: 'Avery', email: 'kmorgan@carr-hall.org', city: 'Smithstad', phone: '755.284.0031', created_at: '2024-08-29' },
  { id: 50, name: 'Landon', email: 'martinezbrent@gmail.com', city: 'East Sarahfort', phone: '646-743-1607', created_at: '2024-09-23' },
];


const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Account Created' },
];
const title='Users'


const Users = () => {
  const { tableUI } = useTable({ rows, headCells, title });

  return (
    <div>
      {tableUI}
    </div>
  );
};

export default Users;

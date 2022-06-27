use StoreAPI;

create table if not exists stores(
	id int not null auto_increment,
    `name` varchar(50) not null,
    `address` varchar (50) not null,
    `owner` int not null,
    primary key(id),
    constraint fk_owner foreign key (`owner`) references users(id)
);
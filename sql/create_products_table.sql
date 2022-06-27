use StoreAPI;

create table if not exists products(
	id int not null auto_increment,
    `name` varchar(50),
    price double,
    storeId int,
    
    primary key(id),
    constraint fk_store foreign key(storeId) references stores(id) on delete no action
);
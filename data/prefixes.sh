#!/bin/sh

psql -U postgres -d umdt -c "select trunc(mac::macaddr) as mac_prefix from (select tracking_data->>'shost' as mac from data group by mac)S group by mac_prefix order by count(*) desc;" > prefixes.txt

psql -U postgres -d umdt -c "select count(*), trunc(mac::macaddr) as mac_prefix from (select tracking_data->>'shost' as mac from data group by mac)S group by mac_prefix order by count(*) desc;" > prefixes-count.txt


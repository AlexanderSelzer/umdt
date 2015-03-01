# umdt
Unified Mobile Device Tracker

## Useful queries

Get data from a specific device
```sql
select * from data where tracking_data @> '{"shost": "6c:ad:f8:8b:23:0"}';
```

Get counts of packets sent by unique hosts
```sql
select count(*), tracking_data->'shost' as shost from data
group by shost;
```

```sql
select count(*), tracking_data->'shost' as shost from data
group by shost having count(*) > 4;
```

```sql
select count(*), trunc(mac::macaddr) as mac_prefix
from (select tracking_data->>'shost' as mac from data group by mac)S
group by mac_prefix
order by count desc;
```

Get data recorded in the last 4 minutes
```sql
select * from data
where created_at > NOW() - INTERVAL '1 minute';`

```sql
select count(*), tracking_data->'shost' as mac from data
where created_at > now() - interval '4 minutes'
group by mac
order by count desc;
```

Get count of different MAC address OUIs, to analyze
```sql
select trunc(mac::macaddr) as mac_prefix from
(
  select tracking_data->>'shost' as mac
  from data group by mac
)S
group by mac_prefix
order by count(*) desc;
```

get saved SSIDs for each device
```sql
select distinct count(*), array_agg(distinct tracking_data->'ssid') as ssid, tracking_data->'shost' as shost from data
group by shost
order by count desc;
```

exclude devices with no SSID probes
```sql
select * from
(
  select distinct count(*), array_agg(distinct tracking_data->'ssid') as ssids, tracking_data->'shost' as shost from data
  group by shost
  order by count desc
)S
where array_length(ssids, 1) > 1;

```

Find everyone who connected to a specific SSID

```sql
select count(*), tracking_data->'shost' as shost from data
where tracking_data @> '{"ssid": "Starbucks"}'
group by shost;
```

```sql
select array_agg(distinct tracking_data->'ssid'), S.mac from
data, (
  select count(*), tracking_data->'shost' as mac from data
  where tracking_data @> '{"ssid": "WirelessViennaAirport"}'
  group by mac)S
where tracking_data->'shost' = S.mac group by S.mac;
```

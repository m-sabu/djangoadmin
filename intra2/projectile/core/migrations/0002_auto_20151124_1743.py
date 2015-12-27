# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import enumerify.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organisation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(default=b'', help_text='For external ids from other systems or APIs.', max_length=50, db_index=True, blank=True)),
                ('name', models.CharField(help_text='Can be Will & Skill AB, Interconnection Ltd and so on.', max_length=50)),
                ('organisation_no', models.CharField(help_text='Organisation No. for registry and taxation and so on.', max_length=30, blank=True)),
                ('kind', enumerify.fields.SelectIntegerField(default=0, db_index=True, choices=[(0, b'Default')])),
                ('address', models.TextField(blank=True)),
                ('zip_area', models.CharField(max_length=30, blank=True)),
                ('zip_code', models.CharField(max_length=30, blank=True)),
                ('country', models.CharField(default=b'se', max_length=2, db_index=True, choices=[(b'af', b'Afghanistan\t '), (b'al', b'Albania'), (b'dz', b'Algeria'), (b'as', b'American Samoa'), (b'ad', b'Andorra'), (b'ao', b'Angola'), (b'ai', b'Anguilla'), (b'aq', b'Antarctica'), (b'ag', b'Antigua and Barbuda'), (b'ar', b'Argentina'), (b'am', b'Armenia'), (b'aw', b'Aruba'), (b'ac', b'Ascension Island'), (b'au', b'Australia'), (b'at', b'Austria'), (b'az', b'Azerbaijan'), (b'bs', b'Bahamas'), (b'bh', b'Bahrain'), (b'bd', b'Bangladesh'), (b'bb', b'Barbados'), (b'by', b'Belarus'), (b'be', b'Belgium'), (b'bz', b'Belize'), (b'bj', b'Benin'), (b'bm', b'Bermuda'), (b'bt', b'Bhutan'), (b'bo', b'Bolivia'), (b'ba', b'Bosnia and Herzegovina'), (b'bw', b'Botswana'), (b'bv', b'Bouvet Island'), (b'br', b'Brazil'), (b'io', b'British Indian Ocean Territory'), (b'vg', b'British Virgin Islands'), (b'bn', b'Brunei Darussalam'), (b'bg', b'Bulgaria'), (b'bf', b'Burkina Faso'), (b'bi', b'Burundi'), (b'kh', b'Cambodia (Khmer)'), (b'cm', b'Cameroon'), (b'ca', b'Canada'), (b'cv', b'Cape Verde'), (b'ky', b'Cayman Islands'), (b'cf', b'Central African Republic'), (b'td', b'Chad'), (b'cl', b'Chile'), (b'cx', b'Christmas Island'), (b'cc', b'Cocos (Keeling) Islands'), (b'co', b'Colombia'), (b'km', b'Comoros'), (b'ck', b'Cook Islands'), (b'cr', b'Costa Rica'), (b'hr', b'Croatia (Hrvatska)'), (b'cu', b'Cuba'), (b'cy', b'Cyprus'), (b'cz', b'Czech Republic'), (b'ci', b"C\xc3\xb4te d'Ivoire"), (b'cd', b'Democratic Republic of the Congo (Formerly Zaire)'), (b'dk', b'Denmark'), (b'dj', b'Djibouti'), (b'dm', b'Dominica'), (b'do', b'Dominican Republic'), (b'tp', b'East Timor'), (b'ec', b'Ecuador'), (b'eg', b'Egypt'), (b'sv', b'El Salvador'), (b'gq', b'Equatorial Guinea'), (b'er', b'Eritrea'), (b'ee', b'Estonia'), (b'et', b'Ethiopia'), (b'eu', b'European Union'), (b'fk', b'Falkland Islands'), (b'fo', b'Faroe Islands'), (b'fm', b'Federated States of Micronesia'), (b'fj', b'Fiji'), (b'fi', b'Finland'), (b'fr', b'France'), (b'gf', b'French Guiana'), (b'pF', b'French Polynesia With Clipperton Island'), (b'tf', b'French Southern and Antarctic Lands'), (b'ga', b'Gabon'), (b'ge', b'Georgia'), (b'de', b'Germany (Deutschland)'), (b'gh', b'Ghana'), (b'gi', b'Gibraltar'), (b'gr', b'Greece'), (b'gl', b'Greenland'), (b'gd', b'Grenada'), (b'gp', b'Guadeloupe'), (b'gu', b'Guam'), (b'gt', b'Guatemala'), (b'gg', b'Guernsey'), (b'gn', b'Guinea'), (b'gw', b'Guinea-Bissau'), (b'gy', b'Guyana'), (b'ht', b'Haiti'), (b'hm', b'Heard Island and McDonald Islands'), (b'hn', b'Honduras'), (b'hk', b'Hong Kong'), (b'hu', b'Hungary'), (b'is', b'Iceland'), (b'in', b'India'), (b'id', b'Indonesia'), (b'ir', b'Iran'), (b'iq', b'Iraq'), (b'ie', b'Ireland'), (b'im', b'Isle of Man'), (b'il', b'Israel'), (b'it', b'Italy'), (b'jm', b'Jamaica'), (b'jp', b'Japan'), (b'je', b'Jersey'), (b'jo', b'Jordan'), (b'kz', b'Kazakhstan'), (b'ke', b'Kenya'), (b'ki', b'Kiribati'), (b'kw', b'Kuwait'), (b'kg', b'Kyrgyzstan'), (b'la', b'Laos'), (b'lv', b'Latvia'), (b'lb', b'Lebanon'), (b'ls', b'Lesotho'), (b'lr', b'Liberia'), (b'ly', b'Libya'), (b'li', b'Liechtenstein'), (b'lt', b'Lithuania'), (b'lu', b'Luxembourg'), (b'mo', b'Macau'), (b'mg', b'Madagascar'), (b'mW', b'Malawi'), (b'my', b'Malaysia'), (b'mv', b'Maldives'), (b'ml', b'Mali'), (b'mt', b'Malta'), (b'mh', b'Marshall Islands'), (b'mq', b'Martinique'), (b'mr', b'Mauritania'), (b'mu', b'Mauritius'), (b'yt', b'Mayotte'), (b'mx', b'Mexico'), (b'md', b'Moldova'), (b'mc', b'Monaco'), (b'mn', b'Mongolia'), (b'me', b'Montenegro'), (b'ms', b'Montserrat'), (b'ma', b'Morocco'), (b'mz', b'Mozambique'), (b'mm', b'Myanmar'), (b'na', b'Namibia'), (b'nr', b'Nauru'), (b'np', b'Nepal'), (b'nl', b'Netherlands'), (b'an', b'Netherlands Antilles'), (b'nc', b'New Caledonia'), (b'nz', b'New Zealand'), (b'ni', b'Nicaragua'), (b'ne', b'Niger'), (b'ng', b'Nigeria'), (b'nu', b'Niue'), (b'nF', b'Norfolk Island'), (b'mp', b'Northern Mariana Islands'), (b'no', b'Norway'), (b'om', b'Oman'), (b'pk', b'Pakistan'), (b'pw', b'Palau'), (b'ps', b'Palestinian territories\tie, West Bank and Gaza Strip'), (b'pa', b'Panama'), (b'pg', b'Papua New Guinea'), (b'py', b'Paraguay'), (b'cn', b"People's Republic of China"), (b'pe', b'Peru'), (b'ph', b'Philippines'), (b'pn', b'Pitcairn Islands'), (b'pl', b'Poland'), (b'pt', b'Portugal'), (b'pr', b'Puerto Rico'), (b'qa', b'Qatar'), (b'mk', b'Republic of Macedonia'), (b'cg', b'Republic of the Congo'), (b'ro', b'Romania'), (b'ru', b'Russia'), (b'rw', b'Rwanda'), (b're', b'R\xc3\xa9union'), (b'sh', b'Saint Helena'), (b'kn', b'Saint Kitts and Nevis'), (b'lc', b'Saint Lucia'), (b'vc', b'Saint Vincent and the Grenadines'), (b'pm', b'Saint-Pierre and Miquelon'), (b'ws', b'Samoa (Formerly Western Samoa)'), (b'sm', b'San Marino'), (b'sa', b'Saudi Arabia'), (b'sn', b'Senegal'), (b'rs', b'Serbia'), (b'sc', b'Seychelles'), (b'sl', b'Sierra Leone'), (b'sg', b'Singapore'), (b'sk', b'Slovakia'), (b'si', b'Slovenia'), (b'sb', b'Solomon Islands'), (b'so', b'Somalia'), (b'za', b'South Africa'), (b'gs', b'South Georgia and the South Sandwich Islands'), (b'kr', b'South Korea'), (b'su', b'Soviet Union'), (b'es', b'Spain (Espa\xc3\xb1a)'), (b'lk', b'Sri Lanka'), (b'sd', b'Sudan'), (b'sr', b'Suriname'), (b'sj', b'Svalbard and Jan Mayen Islands'), (b'sz', b'Swaziland'), (b'se', b'Sweden'), (b'ch', b'Switzerland'), (b'sy', b'Syria'), (b'st', b'S\xc3\xa3o Tom\xc3\xa9 and Pr\xc3\xadncipe'), (b'tw', b'Taiwan'), (b'tj', b'Tajikistan'), (b'tz', b'Tanzania'), (b'th', b'Thailand'), (b'gm', b'The Gambia'), (b'tl', b'Timor-Leste'), (b'tg', b'Togo'), (b'tk', b'Tokelau'), (b'to', b'Tonga'), (b'tt', b'Trinidad and Tobago'), (b'tn', b'Tunisia'), (b'tr', b'Turkey'), (b'tm', b'Turkmenistan'), (b'tc', b'Turks and Caicos Islands'), (b'tv', b'Tuvalu'), (b'vi', b'US Virgin Islands'), (b'ug', b'Uganda'), (b'ua', b'Ukraine'), (b'ae', b'United Arab Emirates'), (b'gb', b'United Kingdom'), (b'uk', b'United Kingdom'), (b'um', b'United States Minor Outlying Islands'), (b'us', b'United States of America'), (b'uy', b'Uruguay'), (b'uz', b'Uzbekistan'), (b'vu', b'Vanuatu'), (b'va', b'Vatican City State'), (b've', b'Venezuela'), (b'vn', b'Vietnam'), (b'wf', b'Wallis and Futuna'), (b'ye', b'Yemen'), (b'yu', b'Yugoslavia'), (b'zm', b'Zambia'), (b'zw', b'Zimbabwe')])),
                ('status', enumerify.fields.SelectIntegerField(default=0, db_index=True, choices=[(0, b'Default'), (1, b'Removed')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='OrganisationUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('access', enumerify.fields.SelectIntegerField(default=0, db_index=True, choices=[(0, b'Read'), (1, b'Read + Write'), (2, b'Admin')])),
                ('status', enumerify.fields.SelectIntegerField(default=0, db_index=True, choices=[(0, b'Active'), (1, b'Removed')])),
                ('is_active', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('organisation', models.ForeignKey(to='core.Organisation')),
            ],
            options={
                'ordering': ('-created_at',),
                'verbose_name_plural': 'Organisation Users',
            },
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='country',
            field=models.CharField(default=b'se', max_length=2, db_index=True, choices=[(b'af', b'Afghanistan\t '), (b'al', b'Albania'), (b'dz', b'Algeria'), (b'as', b'American Samoa'), (b'ad', b'Andorra'), (b'ao', b'Angola'), (b'ai', b'Anguilla'), (b'aq', b'Antarctica'), (b'ag', b'Antigua and Barbuda'), (b'ar', b'Argentina'), (b'am', b'Armenia'), (b'aw', b'Aruba'), (b'ac', b'Ascension Island'), (b'au', b'Australia'), (b'at', b'Austria'), (b'az', b'Azerbaijan'), (b'bs', b'Bahamas'), (b'bh', b'Bahrain'), (b'bd', b'Bangladesh'), (b'bb', b'Barbados'), (b'by', b'Belarus'), (b'be', b'Belgium'), (b'bz', b'Belize'), (b'bj', b'Benin'), (b'bm', b'Bermuda'), (b'bt', b'Bhutan'), (b'bo', b'Bolivia'), (b'ba', b'Bosnia and Herzegovina'), (b'bw', b'Botswana'), (b'bv', b'Bouvet Island'), (b'br', b'Brazil'), (b'io', b'British Indian Ocean Territory'), (b'vg', b'British Virgin Islands'), (b'bn', b'Brunei Darussalam'), (b'bg', b'Bulgaria'), (b'bf', b'Burkina Faso'), (b'bi', b'Burundi'), (b'kh', b'Cambodia (Khmer)'), (b'cm', b'Cameroon'), (b'ca', b'Canada'), (b'cv', b'Cape Verde'), (b'ky', b'Cayman Islands'), (b'cf', b'Central African Republic'), (b'td', b'Chad'), (b'cl', b'Chile'), (b'cx', b'Christmas Island'), (b'cc', b'Cocos (Keeling) Islands'), (b'co', b'Colombia'), (b'km', b'Comoros'), (b'ck', b'Cook Islands'), (b'cr', b'Costa Rica'), (b'hr', b'Croatia (Hrvatska)'), (b'cu', b'Cuba'), (b'cy', b'Cyprus'), (b'cz', b'Czech Republic'), (b'ci', b"C\xc3\xb4te d'Ivoire"), (b'cd', b'Democratic Republic of the Congo (Formerly Zaire)'), (b'dk', b'Denmark'), (b'dj', b'Djibouti'), (b'dm', b'Dominica'), (b'do', b'Dominican Republic'), (b'tp', b'East Timor'), (b'ec', b'Ecuador'), (b'eg', b'Egypt'), (b'sv', b'El Salvador'), (b'gq', b'Equatorial Guinea'), (b'er', b'Eritrea'), (b'ee', b'Estonia'), (b'et', b'Ethiopia'), (b'eu', b'European Union'), (b'fk', b'Falkland Islands'), (b'fo', b'Faroe Islands'), (b'fm', b'Federated States of Micronesia'), (b'fj', b'Fiji'), (b'fi', b'Finland'), (b'fr', b'France'), (b'gf', b'French Guiana'), (b'pF', b'French Polynesia With Clipperton Island'), (b'tf', b'French Southern and Antarctic Lands'), (b'ga', b'Gabon'), (b'ge', b'Georgia'), (b'de', b'Germany (Deutschland)'), (b'gh', b'Ghana'), (b'gi', b'Gibraltar'), (b'gr', b'Greece'), (b'gl', b'Greenland'), (b'gd', b'Grenada'), (b'gp', b'Guadeloupe'), (b'gu', b'Guam'), (b'gt', b'Guatemala'), (b'gg', b'Guernsey'), (b'gn', b'Guinea'), (b'gw', b'Guinea-Bissau'), (b'gy', b'Guyana'), (b'ht', b'Haiti'), (b'hm', b'Heard Island and McDonald Islands'), (b'hn', b'Honduras'), (b'hk', b'Hong Kong'), (b'hu', b'Hungary'), (b'is', b'Iceland'), (b'in', b'India'), (b'id', b'Indonesia'), (b'ir', b'Iran'), (b'iq', b'Iraq'), (b'ie', b'Ireland'), (b'im', b'Isle of Man'), (b'il', b'Israel'), (b'it', b'Italy'), (b'jm', b'Jamaica'), (b'jp', b'Japan'), (b'je', b'Jersey'), (b'jo', b'Jordan'), (b'kz', b'Kazakhstan'), (b'ke', b'Kenya'), (b'ki', b'Kiribati'), (b'kw', b'Kuwait'), (b'kg', b'Kyrgyzstan'), (b'la', b'Laos'), (b'lv', b'Latvia'), (b'lb', b'Lebanon'), (b'ls', b'Lesotho'), (b'lr', b'Liberia'), (b'ly', b'Libya'), (b'li', b'Liechtenstein'), (b'lt', b'Lithuania'), (b'lu', b'Luxembourg'), (b'mo', b'Macau'), (b'mg', b'Madagascar'), (b'mW', b'Malawi'), (b'my', b'Malaysia'), (b'mv', b'Maldives'), (b'ml', b'Mali'), (b'mt', b'Malta'), (b'mh', b'Marshall Islands'), (b'mq', b'Martinique'), (b'mr', b'Mauritania'), (b'mu', b'Mauritius'), (b'yt', b'Mayotte'), (b'mx', b'Mexico'), (b'md', b'Moldova'), (b'mc', b'Monaco'), (b'mn', b'Mongolia'), (b'me', b'Montenegro'), (b'ms', b'Montserrat'), (b'ma', b'Morocco'), (b'mz', b'Mozambique'), (b'mm', b'Myanmar'), (b'na', b'Namibia'), (b'nr', b'Nauru'), (b'np', b'Nepal'), (b'nl', b'Netherlands'), (b'an', b'Netherlands Antilles'), (b'nc', b'New Caledonia'), (b'nz', b'New Zealand'), (b'ni', b'Nicaragua'), (b'ne', b'Niger'), (b'ng', b'Nigeria'), (b'nu', b'Niue'), (b'nF', b'Norfolk Island'), (b'mp', b'Northern Mariana Islands'), (b'no', b'Norway'), (b'om', b'Oman'), (b'pk', b'Pakistan'), (b'pw', b'Palau'), (b'ps', b'Palestinian territories\tie, West Bank and Gaza Strip'), (b'pa', b'Panama'), (b'pg', b'Papua New Guinea'), (b'py', b'Paraguay'), (b'cn', b"People's Republic of China"), (b'pe', b'Peru'), (b'ph', b'Philippines'), (b'pn', b'Pitcairn Islands'), (b'pl', b'Poland'), (b'pt', b'Portugal'), (b'pr', b'Puerto Rico'), (b'qa', b'Qatar'), (b'mk', b'Republic of Macedonia'), (b'cg', b'Republic of the Congo'), (b'ro', b'Romania'), (b'ru', b'Russia'), (b'rw', b'Rwanda'), (b're', b'R\xc3\xa9union'), (b'sh', b'Saint Helena'), (b'kn', b'Saint Kitts and Nevis'), (b'lc', b'Saint Lucia'), (b'vc', b'Saint Vincent and the Grenadines'), (b'pm', b'Saint-Pierre and Miquelon'), (b'ws', b'Samoa (Formerly Western Samoa)'), (b'sm', b'San Marino'), (b'sa', b'Saudi Arabia'), (b'sn', b'Senegal'), (b'rs', b'Serbia'), (b'sc', b'Seychelles'), (b'sl', b'Sierra Leone'), (b'sg', b'Singapore'), (b'sk', b'Slovakia'), (b'si', b'Slovenia'), (b'sb', b'Solomon Islands'), (b'so', b'Somalia'), (b'za', b'South Africa'), (b'gs', b'South Georgia and the South Sandwich Islands'), (b'kr', b'South Korea'), (b'su', b'Soviet Union'), (b'es', b'Spain (Espa\xc3\xb1a)'), (b'lk', b'Sri Lanka'), (b'sd', b'Sudan'), (b'sr', b'Suriname'), (b'sj', b'Svalbard and Jan Mayen Islands'), (b'sz', b'Swaziland'), (b'se', b'Sweden'), (b'ch', b'Switzerland'), (b'sy', b'Syria'), (b'st', b'S\xc3\xa3o Tom\xc3\xa9 and Pr\xc3\xadncipe'), (b'tw', b'Taiwan'), (b'tj', b'Tajikistan'), (b'tz', b'Tanzania'), (b'th', b'Thailand'), (b'gm', b'The Gambia'), (b'tl', b'Timor-Leste'), (b'tg', b'Togo'), (b'tk', b'Tokelau'), (b'to', b'Tonga'), (b'tt', b'Trinidad and Tobago'), (b'tn', b'Tunisia'), (b'tr', b'Turkey'), (b'tm', b'Turkmenistan'), (b'tc', b'Turks and Caicos Islands'), (b'tv', b'Tuvalu'), (b'vi', b'US Virgin Islands'), (b'ug', b'Uganda'), (b'ua', b'Ukraine'), (b'ae', b'United Arab Emirates'), (b'gb', b'United Kingdom'), (b'uk', b'United Kingdom'), (b'um', b'United States Minor Outlying Islands'), (b'us', b'United States of America'), (b'uy', b'Uruguay'), (b'uz', b'Uzbekistan'), (b'vu', b'Vanuatu'), (b'va', b'Vatican City State'), (b've', b'Venezuela'), (b'vn', b'Vietnam'), (b'wf', b'Wallis and Futuna'), (b'ye', b'Yemen'), (b'yu', b'Yugoslavia'), (b'zm', b'Zambia'), (b'zw', b'Zimbabwe')]),
        ),
        migrations.AddField(
            model_name='organisationuser',
            name='profile',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='organisationuser',
            unique_together=set([('organisation', 'profile')]),
        ),
    ]

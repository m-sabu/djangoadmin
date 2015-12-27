# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20151124_1743'),
    ]

    operations = [
        migrations.CreateModel(
            name='Descendant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
        migrations.AlterField(
            model_name='organisation',
            name='address',
            field=models.TextField(verbose_name='Address', blank=True),
        ),
        migrations.AlterField(
            model_name='organisation',
            name='organisation_no',
            field=models.CharField(help_text='Organisation No. for registry and taxation and so on.', max_length=30, verbose_name='Organisation No.', blank=True),
        ),
        migrations.AlterField(
            model_name='organisation',
            name='zip_area',
            field=models.CharField(max_length=30, verbose_name='Zip Area', blank=True),
        ),
        migrations.AlterField(
            model_name='organisation',
            name='zip_code',
            field=models.CharField(max_length=30, verbose_name='Zip Code', blank=True),
        ),
        migrations.AddField(
            model_name='descendant',
            name='child',
            field=models.ForeignKey(related_name='parent_set', to='core.Organisation'),
        ),
        migrations.AddField(
            model_name='descendant',
            name='parent',
            field=models.ForeignKey(related_name='descendant_set', to='core.Organisation'),
        ),
        migrations.AlterUniqueTogether(
            name='descendant',
            unique_together=set([('parent', 'child')]),
        ),
    ]

import $ from 'jquery'

export default function (user) {
  return {
    dom: '<"row"<"col-xs-6"<"hidden-xs"B>><"col-xs-6"f>><"row"<"col-xs-12"tr>><"row"<"col-sm-5"i><"col-sm-7"p>>',
    processing: true,
    autoWidth: false, //禁用自动调整列宽
    ajax: '/api/role/user',
    serverSide: true,
    rowId: 'userId',
    buttons: {
      dom: {
        container: {
          className: 'btn-group btn-group-sm'
        },
        button: {
          className: 'btn btn-default btn-outline'
        }
      },
      buttons: [
        {
          extend: 'copy',
          text: '拷贝'
        },
        {
          extend: 'excel',
          text: '导出 Excel'
        },
        {
          extend: 'csv',
          text: '导出 CSV'
        },
        {
          extend: 'print',
          text: '打印'
        }
      ]
    },
    columns: [
      {
        "render": function () {
          var checkbox = '<span class="checkbox-custom checkbox-primary">' +
            '<input type="checkbox" class="contacts-checkbox selectable-item">' +
            '<label></label></span>';
          return checkbox;
        }
      },
      {"data": "loginName"},
      {"data": "createTime"},
      {"data": "lastLoginTime"},
      {"data": "loginCount"},
      {"data": "lastLoginIp"},
      {
        "render": function () {
          var edit = '<button type="button" class="btn btn-sm btn-icon btn-pure btn-default"' + ' data-toggle="edit"><i class="icon wb-edit" aria-hidden="true"></i></button>';
          return edit;
        }
      }
    ],
    rowCallback: function (row, data) {
      if (data.state === "FORBIDDEN") {
        $(row).addClass('disabled');
      }

      if (data.userId === user) {
        $(row).find('input:checkbox').prop('disabled', true);
      }
    }
  }
}

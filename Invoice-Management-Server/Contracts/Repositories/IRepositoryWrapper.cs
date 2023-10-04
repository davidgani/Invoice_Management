﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Repositories
{
    public interface IRepositoryWrapper
    {
        IInvoiceRepository Invoice { get; }
        void Save();
    }
}
